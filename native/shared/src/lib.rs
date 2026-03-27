use std::sync::LazyLock;

use regex::Regex;

pub mod resizer;
pub mod slicer;
pub mod types;

mod ocr;
pub use ocr::Ocr;

mod catalog;
pub use catalog::Catalog;

mod classifier;
pub use classifier::Classifier;

use types::{Entry, Icon, Quantity, Stockpile};

static CRATED_REGEX: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"-crated$").unwrap());
static THOUSANDS_REGEX: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"k\+$").unwrap());
static NODES_REGEX: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"x$").unwrap());

pub fn extract_stockpile(
    rgba: &[u8],
    width: usize,
    ocr: &Ocr,
    icon_classifier: &mut Classifier,
    quantity_classifier: &mut Classifier,
) -> Result<Option<Stockpile>, Box<dyn std::error::Error>> {
    let mut stockpile = match slicer::slice_stockpile(rgba, width) {
        Some(s) => s,
        None => return Ok(None),
    };

    slicer::slice_structure_technology(rgba, width, &mut stockpile);

    if let Some(header) = &mut stockpile.header {
        header.structure_type.value =
            Some(ocr.recognize_header(&rgba, width, &header.structure_type.bounds)?);

        if let Some(stockpile_name) = &mut header.stockpile_name {
            stockpile_name.value =
                Some(ocr.recognize_header(&rgba, width, &stockpile_name.bounds)?);
        }
    }

    if stockpile.contents.is_empty() {
        return Ok(Some(stockpile));
    }

    let raw_icon_code_names = icon_classifier.batch_predict(
        &rgba,
        width,
        stockpile.contents.iter().map(|e| &e.icon.bounds),
    )?;

    let icons = stockpile
        .contents
        .iter()
        .enumerate()
        .map(|(index, entry)| Icon {
            bounds: entry.icon.bounds.offset(0, 0),
            code_name: Some(
                CRATED_REGEX
                    .replace(&raw_icon_code_names[index], "")
                    .into_owned(),
            ),
            is_crated: Some(CRATED_REGEX.is_match(&raw_icon_code_names[index])),
        });

    let raw_quantities = quantity_classifier.batch_predict(
        &rgba,
        width,
        stockpile.contents.iter().map(|e| &e.quantity.bounds),
    )?;

    let quantities = stockpile.contents.iter().enumerate().map(|(index, entry)| {
        let label: String = raw_quantities[index].to_owned();

        // If parsing fails, treat extraction as failed for this image (=> null).
        let value = (|| -> Option<u32> {
            if THOUSANDS_REGEX.is_match(&label) {
                let n = THOUSANDS_REGEX.replace(&label, "");
                n.parse::<u32>().ok()?.checked_mul(1000)
            } else if NODES_REGEX.is_match(&label) {
                let n = NODES_REGEX.replace(&label, "");
                n.parse::<u32>().ok()
            } else {
                label.parse::<u32>().ok()
            }
        })();

        let value = match value {
            Some(v) => v,
            None => return Err("quantity parse failed".into()),
        };

        Ok::<_, Box<dyn std::error::Error>>(Quantity {
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
        classified_contents.push(Entry {
            icon,
            quantity,
            attributes: None,
        });
    }

    stockpile.contents = classified_contents;

    Ok(Some(stockpile))
}
