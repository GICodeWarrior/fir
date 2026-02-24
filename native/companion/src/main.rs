use std::io::{self, Read};
use std::path::Path;
use std::sync::OnceLock;
use std::fs::File;

use tensorflow::{Graph, SavedModelBundle, SessionOptions, SessionRunArgs, Tensor, DEFAULT_SERVING_SIGNATURE_DEF_KEY, Operation};
use image::RgbaImage;
use regex::Regex;

use fis::slicer;
use fis::resizer;

mod as_slice;
use as_slice::AsSlice;


static CRATED_REGEX: OnceLock<Regex> = OnceLock::new();
static THOUSANDS_REGEX: OnceLock<Regex> = OnceLock::new();
static NODES_REGEX: OnceLock<Regex> = OnceLock::new();

fn crated_regex() -> &'static Regex {
    CRATED_REGEX.get_or_init(|| Regex::new(r"-crated$").unwrap())
}

fn thousands_regex() -> &'static Regex {
    THOUSANDS_REGEX.get_or_init(|| Regex::new(r"k\+$").unwrap())
}

fn nodes_regex() -> &'static Regex {
    NODES_REGEX.get_or_init(|| Regex::new(r"x$").unwrap())
}

struct Classifier {
    model_shape: (usize, usize),
    channels: u8,

    class_names: Vec<String>,

    per_item_size: usize,

    // Cached TF objects (must keep Graph alive for Operations)
    _graph: Graph,
    bundle: SavedModelBundle,
    input_operation: Operation,
    output_operation: Operation,

    bicubic: resizer::BicubicResizerFixed,

    // Reused buffers to avoid reallocations
    batch: Vec<f32>,
}

impl Classifier {
    pub fn new(
        model_path: impl AsRef<Path>,
        model_shape: (usize, usize),
        channels: u8,
        class_names_path: impl AsRef<Path>,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let raw_class_names = std::fs::read_to_string(class_names_path)?;
        let class_names: Vec<String> = serde_json::from_str(&raw_class_names)?;

        let per_item_size = model_shape.0 * model_shape.1 * channels as usize;

        let mut graph = Graph::new();
        let bundle = SavedModelBundle::load(
            &SessionOptions::new(),
            &["serve"],
            &mut graph,
            model_path.as_ref(),
        )?;

        let signature = bundle
            .meta_graph_def()
            .get_signature(DEFAULT_SERVING_SIGNATURE_DEF_KEY)?;

        let input_info = signature
            .get_input("keras_tensor")?;
        let input_operation_name = &input_info.name().name;
        let input_operation = graph.operation_by_name_required(input_operation_name)?;

        let output_info = signature
            .get_output("output_0")?;
        let output_operation_name = &output_info.name().name;
        let output_operation = graph.operation_by_name_required(output_operation_name)?;

        let bicubic = resizer::BicubicResizerFixed::new();

        Ok(Self {
            model_shape,
            channels,
            class_names,
            per_item_size,
            _graph: graph,
            bundle,
            input_operation,
            output_operation,
            bicubic,
            batch: Vec::new(),
        })
    }

    fn slice_and_resize(&mut self, image: &RgbaImage, bounds: &slicer::Bounds) {
        let slice = slicer::slice_rgba(image.as_raw(), image.width() as usize, &bounds);
        let resized = self.bicubic.resize(
            &slice,
            bounds.width,
            bounds.height,
            self.model_shape.1,
            self.model_shape.0,
        );

        match self.channels {
            1 => for chunk in resized.chunks_exact(4) {
                self.batch.push(chunk[0] as f32);
            },
            3 => for chunk in resized.chunks_exact(4) {
                self.batch.push(chunk[0] as f32);
                self.batch.push(chunk[1] as f32);
                self.batch.push(chunk[2] as f32);
            },
            _ => panic!("channels must be 1 or 3"),
        }
    }

    fn arg_max(batch: &Tensor<f32>) -> Vec<i64> {
        let dims = batch.dims();
        assert_eq!(dims.len(), 2);

        let rows = dims[0] as usize;
        let cols = dims[1] as usize;

        let data: &[f32] = batch.as_slice();

        let mut result = Vec::with_capacity(rows);

        for row in data.chunks_exact(cols) {
            let mut best_i = 0usize;
            let mut best_v = row[0];

            for (i, &v) in row.iter().enumerate().skip(1) {
                // For ML logits, NaNs usually shouldn't happen.
                // This treats NaN as "never better" than current best.
                if v > best_v {
                    best_v = v;
                    best_i = i;
                }
            }

            result.push(best_i as i64);
        }

        result
    }

    fn batch_predict<'a, I>(
        &mut self,
        image: &RgbaImage,
        bounds: I,
    ) -> Vec<String>
    where
        I: ExactSizeIterator<Item = &'a slicer::Bounds>,
    {
        let batch_size = bounds.len();

        self.batch.clear();
        self.batch.reserve_exact(self.per_item_size * batch_size);
        for b in bounds {
            self.slice_and_resize(image, b);
        }

        let input_tensor: Tensor<f32> = Tensor::new(&[batch_size as u64, self.model_shape.0 as u64, self.model_shape.1 as u64, self.channels as u64]).with_values(&self.batch).unwrap();

        let mut args = SessionRunArgs::new();
        args.add_feed(&self.input_operation, 0, &input_tensor);
        let token_output = args.request_fetch(&self.output_operation, 0);
        self.bundle.session.run(&mut args).unwrap();

        let output: Tensor<f32> = args.fetch(token_output).unwrap();

        Self::arg_max(&output).into_iter().map(|i| self.class_names[i as usize].clone()).collect()
    }
}

// Helper: read bytes from a filename, where "-" means stdin.
fn read_input_bytes(filename: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
    let mut bytes = Vec::new();
    if filename == "-" {
        io::stdin().read_to_end(&mut bytes)?;
    } else {
        File::open(filename)?.read_to_end(&mut bytes)?;
    }
    Ok(bytes)
}

// Helper: process a single image buffer into an optional classified stockpile.
// Any failure returns Ok(None) so caller can output null.
fn process_one(
    bytes: &[u8],
    icon_classifier: &mut Classifier,
    quantity_classifier: &mut Classifier,
) -> Result<Option<slicer::Stockpile>, Box<dyn std::error::Error>> {
    // Decode
    let image = match image::load_from_memory(bytes) {
        Ok(img) => img.into_rgba8(),
        Err(_) => return Ok(None),
    };

    let width = image.width() as usize;

    // Slice stockpile
    let stockpile = match slicer::slice_stockpile(image.as_raw(), width) {
        Some(s) => s,
        None => return Ok(None),
    };

    if stockpile.contents.is_empty() {
      return Ok(Some(stockpile));
    }

    // Classify icons
    let raw_icon_code_names = icon_classifier.batch_predict(
        &image,
        stockpile.contents.iter().map(|e| &e.icon.bounds),
    );

    let icons = stockpile
        .contents
        .iter()
        .enumerate()
        .map(|(index, entry)| slicer::Icon {
            bounds: entry.icon.bounds.offset(0, 0),
            CodeName: Some(crated_regex().replace(&raw_icon_code_names[index], "").into_owned()),
            isCrated: Some(crated_regex().is_match(&raw_icon_code_names[index])),
        });

    // Classify quantities
    let raw_quantities = quantity_classifier.batch_predict(
        &image,
        stockpile.contents.iter().map(|e| &e.quantity.bounds),
    );

    let quantities = stockpile.contents.iter().enumerate().map(|(index, entry)| {
        let label: String = raw_quantities[index].to_owned();

        // If parsing fails, treat extraction as failed for this image (=> null).
        let value = (|| -> Option<u32> {
            if thousands_regex().is_match(&label) {
                let n = thousands_regex().replace(&label, "");
                n.parse::<u32>().ok()?.checked_mul(1000)
            } else if nodes_regex().is_match(&label) {
                let n = nodes_regex().replace(&label, "");
                n.parse::<u32>().ok()
            } else {
                label.parse::<u32>().ok()
            }
        })();

        let value = match value {
            Some(v) => v,
            None => return Err("quantity parse failed".into()),
        };

        Ok::<_, Box<dyn std::error::Error>>(slicer::Quantity {
            bounds: entry.quantity.bounds.offset(0, 0),
            label: Some(label),
            value: Some(value),
        })
    });

    let mut classified_contents = Vec::with_capacity(stockpile.contents.len());
    for (icon, quantity_res) in icons.zip(quantities) {
        let quantity = match quantity_res {
            Ok(q) => q,
            Err(_) => return Ok(None),
        };
        classified_contents.push(slicer::Entry { icon, quantity });
    }

    let classified_stockpile = slicer::Stockpile {
        bounds: stockpile.bounds,
        header: stockpile.header,
        contents: classified_contents,
        quantity_grey: stockpile.quantity_grey,
    };

    Ok(Some(classified_stockpile))
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    unsafe { std::env::set_var("TF_CPP_MIN_LOG_LEVEL", "1"); }
    let data_path = std::env::current_exe()?;

    // Collect filenames from argv. If none provided, default to "-" (stdin).
    let mut args = std::env::args();
    let _exe = args.next();
    let mut filenames: Vec<String> = args.collect();
    if filenames.is_empty() {
        filenames.push("-".to_string());
    }

    // Load classifiers once and reuse across files.
    let mut icon_classifier = Classifier::new(
        data_path.with_file_name("model-icon"),
        (32, 32),
        3,
        data_path.with_file_name("model-icon/class_names.json"),
    )?;

    let mut quantity_classifier = Classifier::new(
        data_path.with_file_name("model-quantity"),
        (16, 21),
        1,
        data_path.with_file_name("model-quantity/class_names.json"),
    )?;

    // Process each file, pushing Some(stockpile) or None (=> null).
    let mut outputs: Vec<Option<slicer::Stockpile>> = Vec::with_capacity(filenames.len());

    for filename in filenames {
        let one = match read_input_bytes(&filename) {
            Ok(bytes) => process_one(
                &bytes,
                &mut icon_classifier,
                &mut quantity_classifier,
            )
            .unwrap_or(None),
            Err(_) => None,
        };
        outputs.push(one);
    }

    // Always output a JSON array.
    println!("{}", serde_json::to_string_pretty(&outputs)?);
    Ok(())
}

