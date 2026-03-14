use std::path::Path;
use std::sync::OnceLock;

use regex::Regex;

use ocrs::{ImageSource, OcrEngine, OcrEngineParams};
use rten::Model;
//use rten_imageproc::BoundingRect;
use rten_imageproc::RectF;
use rten_imageproc::RotatedRect;

use crate::types::Bounds;

static L_TO_I_REGEX: OnceLock<Regex> = OnceLock::new();
fn l_to_i_regex() -> &'static Regex {
    L_TO_I_REGEX.get_or_init(|| Regex::new(r"l").unwrap())
}

static I_TO_L_REGEX: OnceLock<Regex> = OnceLock::new();
fn i_to_l_regex() -> &'static Regex {
    I_TO_L_REGEX.get_or_init(|| Regex::new(r"([a-z])I([^A-Z]|$)").unwrap())
}

pub struct Ocr {
    engine: OcrEngine,
}

impl Ocr {
    pub fn new_from_paths(
        recognition_model: impl AsRef<Path>,
    ) -> Result<Ocr, Box<dyn std::error::Error>> {
        Self::new(Model::load_file(recognition_model)?)
    }

    pub fn new_from_bytes(recognition_model: Vec<u8>) -> Result<Ocr, Box<dyn std::error::Error>> {
        Self::new(Model::load(recognition_model)?)
    }

    pub fn new_from_static(
        recognition_model: &'static [u8],
    ) -> Result<Ocr, Box<dyn std::error::Error>> {
        Self::new(Model::load_static_slice(recognition_model)?)
    }

    fn new(recognition_model: Model) -> Result<Ocr, Box<dyn std::error::Error>> {
        Ok(Ocr {
            engine: OcrEngine::new(OcrEngineParams {
                recognition_model: Some(recognition_model),
                ..Default::default()
            })?,
        })
    }

    pub fn recognize_header(
        &self,
        rgba: &[u8],
        width: usize,
        bounds: &Bounds,
    ) -> Result<String, Box<dyn std::error::Error>> {
        let text_height = (bounds.height * 5 + 4) / 8;
        let crop_offset = ((bounds.height - text_height) * 2 + 1) / 3;
        let crop_bounds = Bounds {
            x: bounds.x + crop_offset,
            y: bounds.y + crop_offset,
            width: bounds.width - crop_offset,
            height: text_height,
        };

        let mut processed = Vec::with_capacity(crop_bounds.width * crop_bounds.height);
        let mut min_x = usize::MAX;
        let mut min_y = usize::MAX;
        let mut max_x = usize::MIN;
        let mut max_y = usize::MIN;

        for (y, row) in (crop_bounds.y..crop_bounds.y + crop_bounds.height).enumerate() {
            let row_start = (row * width + crop_bounds.x) * 4;
            let row_end = row_start + crop_bounds.width * 4;
            for (x, pixel) in rgba[row_start..row_end].chunks_exact(4).enumerate() {
                let luma =
                    ((77 * pixel[0] as u16 + 150 * pixel[1] as u16 + 29 * pixel[2] as u16 + 128)
                        >> 8) as u8;
                processed.push(luma.max(144));

                if luma > 200 {
                    min_x = min_x.min(x);
                    min_y = min_y.min(y);
                    max_x = max_x.max(x);
                    max_y = max_y.max(y);
                }
            }
        }

        let tight_crop_bounds = if min_x <= max_x && min_y <= max_y {
            let padding = (bounds.height + 4) / 8;
            let x = min_x.saturating_sub(padding);
            let y = min_y.saturating_sub(padding);
            Bounds {
                x,
                y,
                width: (max_x - min_x + 1 + 2 * padding).min(crop_bounds.width - x),
                height: (max_y - min_y + 1 + 2 * padding).min(crop_bounds.height - y),
            }
        } else {
            return Ok("".into());
            //return Err("no valid text pixels found: {}".into());
        };

        /*
        let mut tight_slice =
            Vec::with_capacity((tight_crop_bounds.width * tight_crop_bounds.height) as usize);
        for row in 0..tight_crop_bounds.height {
            let src_y = tight_crop_bounds.y + row;
            let src_start = (src_y * crop_bounds.width + tight_crop_bounds.x) as usize;
            let src_end = src_start + tight_crop_bounds.width as usize;
            tight_slice.extend_from_slice(&processed[src_start..src_end]);
        }*/

        /*
        let epoch = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .expect("time went backwards")
            .as_secs();
        let gray: ImageBuffer<Luma<u8>, Vec<u8>> = ImageBuffer::from_raw(tight_crop_bounds.width as u32, tight_crop_bounds.height as u32, tight_slice.clone()).unwrap();
        gray.save(format!("{}-debug.png", epoch)).unwrap();
        */

        let ocr_image = ImageSource::from_bytes(
            &processed,
            (crop_bounds.width as u32, crop_bounds.height as u32),
        )?;
        let ocr_input = self.engine.prepare_input(ocr_image)?;
        //let text = self.engine.get_text(&ocr_input).unwrap();

        let rect = RotatedRect::from_rect(RectF::from_tlhw(
            tight_crop_bounds.y as f32,
            tight_crop_bounds.x as f32,
            tight_crop_bounds.height as f32,
            tight_crop_bounds.width as f32,
        ));
        //eprintln!("{:?}", tight_crop_bounds);
        //dbg!(rect.bounding_rect());
        let mut text_lines = self
            .engine
            .recognize_text(&ocr_input, &[[rect].to_vec()])?
            .into_iter()
            .flatten()
            .map(|l| {
                let owned = l.to_string();
                let s = owned.trim();
                let s = l_to_i_regex().replace_all(&s, "I");
                let s = i_to_l_regex().replace_all(&s, "${1}l${2}");
                s.to_string()
            });

        match (text_lines.next(), text_lines.next()) {
            (Some(text), None) => Ok(text),
            _ => Err("expected exactly one text line".into()),
        }

        //let text = "".to_string();

        //let sharp_ocr_image = ImageSource::from_bytes(&hard_threshold, (crop_bounds.width as u32, crop_bounds.height as u32)).unwrap();
        //let sharp_ocr_input = self.engine.prepare_input(sharp_ocr_image).unwrap();

        /*
        let word_rects = self.engine.detect_words(&ocr_input).unwrap();
        let line_rects = self.engine.find_text_lines(&ocr_input, &word_rects);

        let largest_line = line_rects
            .into_iter()
            .max_by(|a, b| {
                let area_a: f32 = a.iter().map(|r| r.area().abs()).sum();
                let area_b: f32 = b.iter().map(|r| r.area().abs()).sum();
                area_a.total_cmp(&area_b)
            });

        let text = if let Some(largest_line) = largest_line {
            eprintln!("{:?}", tight_crop_bounds);
            eprintln!("{:?}", largest_line.iter().map(|r| r.bounding_rect()).collect::<Vec<RectF>>());
            let line_texts = self.engine.recognize_text(&ocr_input, &[largest_line]).unwrap();
            match line_texts.into_iter().next().flatten() {
                Some(l) => l.to_string(),
                None => "".to_string(),
            }
        } else {
            "".to_string()
        };*/

        //text
    }
}
