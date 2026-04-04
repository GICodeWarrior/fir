use std::fs::File;
use std::io::{self, Read};

use form_urlencoded;
use subtle::ConstantTimeEq;
use tiny_http::{Header, Method, Response, Server, StatusCode};

use fis::Catalog;
use fis::Classifier;
use fis::Ocr;
use fis::extract_stockpile;

macro_rules! fir_version {
    () => {
        "airborne-63"
    };
}

macro_rules! fir_path {
    (includes/$file:literal) => {
        concat!("../../../includes/", $file)
    };
    (foxhole/$file:literal) => {
        concat!("../../../foxhole/", fir_version!(), "/", $file)
    };
}

static VERSION: &str = fir_version!();
static OCR_RECOGNITION_ONNX: &[u8] =
    include_bytes!(fir_path!(includes / "text-recognition-model.onnx"));
static ICON_ONNX: &[u8] = include_bytes!(fir_path!(foxhole / "classifier/model.onnx"));
static QUANTITY_ONNX: &[u8] = include_bytes!(fir_path!(includes / "quantities/model.onnx"));

static ICON_CLASS_NAMES_JSON: &str =
    include_str!(fir_path!(foxhole / "classifier/class_names.json"));
static QUANTITY_CLASS_NAMES_JSON: &str =
    include_str!(fir_path!(includes / "quantities/class_names.json"));
static CATALOG_JSON: &str = include_str!(fir_path!(foxhole / "catalog.json"));

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

fn get_classifiers() -> Result<(Ocr, Classifier, Classifier), Box<dyn std::error::Error>> {
    Ok((
        Ocr::new_from_static(OCR_RECOGNITION_ONNX)?,
        Classifier::new_from_static(
            ICON_ONNX,
            (32, 32),
            3,
            serde_json::from_str(ICON_CLASS_NAMES_JSON)?,
        )?,
        Classifier::new_from_static(
            QUANTITY_ONNX,
            (16, 21),
            1,
            serde_json::from_str(QUANTITY_CLASS_NAMES_JSON)?,
        )?,
    ))
}

fn command_extract(filenames: Vec<String>) -> Result<(), Box<dyn std::error::Error>> {
    if filenames.is_empty() {
        return Err("No files provided to extract.".into());
    }

    let (ocr, mut icon_classifier, mut quantity_classifier) = get_classifiers()?;

    let mut outputs: Vec<Option<_>> = Vec::with_capacity(filenames.len());

    for filename in filenames {
        let bytes = read_input_bytes(&filename)?;
        let image = image::load_from_memory(&bytes)?.into_rgba8();
        let width = image.width() as usize;

        let stockpile = extract_stockpile(
            &image,
            width,
            &ocr,
            &mut icon_classifier,
            &mut quantity_classifier,
        )?;
        outputs.push(stockpile);
    }
    println!("{}", serde_json::to_string_pretty(&outputs)?);

    Ok(())
}

fn command_http_server(args: Vec<String>) -> Result<(), Box<dyn std::error::Error>> {
    let [addr] = <[String; 1]>::try_from(args)
        .map_err(|_| "Expecting server address only (e.g. 127.0.0.1:8000)")?;

    let server = Server::http(addr).map_err(|_| "Failed to start server.")?;
    eprintln!("Listening on http://{}", server.server_addr().to_string());

    let api_key = std::env::var("FIC_API_KEY")
        .ok()
        .filter(|k| !k.is_empty())
        .map(String::into_bytes);
    if api_key.is_some() {
        eprintln!(
            "Warning: API key authentication enabled via HTTP.  Implement a TLS proxy for public/shared networks."
        );
    }

    let (ocr, mut icon_classifier, mut quantity_classifier) = get_classifiers()?;
    let content_type_header = Header::from_bytes("Content-Type", "application/json").unwrap();
    let catalog = Catalog::new_from_json(CATALOG_JSON)?;

    for mut request in server.incoming_requests() {
        let start = std::time::Instant::now();
        let method = request.method().clone();
        let url = request.url().to_string();
        let remote_addr = request
            .remote_addr()
            .map(|a| a.to_string())
            .unwrap_or_default();

        let (path, query) = match url.split_once('?') {
            Some((p, q)) => (p, Some(q)),
            None => (url.as_str(), None),
        };

        if method != Method::Post || path != "/extract" {
            eprintln!("{remote_addr} {method} {url} 404 {:?}", start.elapsed());
            let r = Response::from_string("Not Found").with_status_code(StatusCode(404));
            let _ = request.respond(r);
            continue;
        }

        if let Some(ref expected_key) = api_key {
            let authorized = request
                .headers()
                .iter()
                .find(|h| h.field.equiv("Authorization"))
                .and_then(|h| h.value.as_str().strip_prefix("X-API-Key "))
                .map(|k| k.as_bytes())
                .is_some_and(|k| k.len() == expected_key.len() && k.ct_eq(expected_key).into());

            if !authorized {
                eprintln!("{remote_addr} {method} {url} 401 {:?}", start.elapsed());
                let r = Response::from_string("Unauthorized").with_status_code(StatusCode(401));
                let _ = request.respond(r);
                continue;
            }
        }

        let Ok(includes) = query
            .into_iter()
            .flat_map(|q| form_urlencoded::parse(q.as_bytes()))
            .filter(|(key, _)| key == "include")
            .flat_map(|(_, value)| value.split(',').map(String::from).collect::<Vec<_>>())
            .map(|value| {
                value
                    .strip_prefix('.')
                    .ok_or(())
                    .map(|s| s.split('.').map(String::from).collect())
            })
            .collect::<Result<Vec<Vec<String>>, _>>()
        else {
            eprintln!("{remote_addr} {method} {url} 400 {:?}", start.elapsed());
            let r = Response::from_string("Bad Request").with_status_code(StatusCode(400));
            let _ = request.respond(r);
            continue;
        };

        let result = (|| -> Result<String, Box<dyn std::error::Error>> {
            let mut body = Vec::new();
            request.as_reader().read_to_end(&mut body)?;
            let image = image::load_from_memory(&body)?.into_rgba8();
            let mut stockpile = extract_stockpile(
                &image,
                image.width() as usize,
                &ocr,
                &mut icon_classifier,
                &mut quantity_classifier,
            )?;
            if !includes.is_empty() {
                if let Some(stockpile) = &mut stockpile {
                    for entry in &mut stockpile.contents {
                        let mut attributes = entry.attributes.get_or_insert_default();
                        let code_name = &entry.icon.code_name.as_ref().ok_or("Missing CodeName")?;
                        let _ = catalog.merge_attributes(code_name, &includes, &mut attributes);
                    }
                }
            }

            Ok(serde_json::to_string_pretty(&stockpile)?)
        })();

        match result {
            Ok(json) => {
                eprintln!("{remote_addr} {method} {url} 200 {:?}", start.elapsed());
                let r = Response::from_string(json).with_header(content_type_header.clone());
                let _ = request.respond(r);
            }
            Err(e) => {
                eprintln!("{remote_addr} {method} {url} 500 {:?} {e}", start.elapsed());
                let r = Response::from_string(format!("Internal Server Error: {e}"))
                    .with_status_code(StatusCode(500));
                let _ = request.respond(r);
            }
        }
    }

    Ok(())
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    unsafe {
        std::env::set_var("RTEN_NUM_THREADS", "1");
    }

    let mut args = std::env::args();
    let _exe = args.next();
    let command = match args.next() {
        Some(c) => c,
        None => {
            return Err("Missing command".into());
        }
    };

    if command == "extract" {
        command_extract(args.collect())
    } else if command == "http-server" {
        command_http_server(args.collect())
    } else if command == "version" {
        eprintln!("{}", VERSION);
        Ok(())
    } else {
        Err("Invalid command".into())
    }
}
