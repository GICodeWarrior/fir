use std::collections::HashMap;
use std::env;
use std::error::Error;
use std::fs;
use std::path::PathBuf;
use std::time::Instant;

use serde::Deserialize;

use fis::Classifier;
use fis::Ocr;
use fis::extract_stockpile;

struct Args {
    version: String,
    data: PathBuf,
}

fn parse_args() -> Args {
    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        eprintln!("Usage: stockpile-test <VERSION> <DATA_PATH>");
        std::process::exit(2);
    }

    Args {
        version: args[1].clone(),
        data: PathBuf::from(&args[2]),
    }
}

// ── Expected JSON types ────────────────────────────────────────────────

#[derive(Deserialize)]
struct ExpectedStockpile {
    file: String,
    #[serde(rename = "box")]
    bounds: ExpectedBox,
    header: ExpectedHeader,
    version: String,
    structure_technologies: Option<Vec<serde_json::Value>>,
    contents: Vec<ExpectedContent>,
}

#[derive(Deserialize)]
struct ExpectedBox {
    x: usize,
    y: usize,
    width: usize,
    height: usize,
}

#[derive(Deserialize)]
struct ExpectedHeader {
    #[serde(rename = "type")]
    structure_type: Option<String>,
    name: Option<String>,
}

#[derive(Deserialize)]
struct ExpectedContent {
    #[serde(rename = "CodeName")]
    code_name: String,
    quantity: u32,
    #[serde(rename = "isCrated")]
    is_crated: bool,
}

// ── Version migration ──────────────────────────────────────────────────

const VERSION_HISTORY: &[&str] = &[
    "entrenched",
    "inferno",
    "inferno-52",
    "naval",
    "naval-56",
    "naval-57",
    "infantry-59",
    "infantry-60",
    "infantry-61",
    "airborne-63",
];

/// `None` value means the item was removed; `Some(new)` means it was renamed.
type ChangeMap = HashMap<&'static str, Option<&'static str>>;

/// Helper: expands to `Some("x")` if a token is present, `None` otherwise.
macro_rules! option_expr {
    () => {
        None
    };
    ($v:literal) => {
        Some($v)
    };
}

/// Build a `ChangeMap` from entries like `"Old" => "New"` (rename) or `"Removed"` (deletion).
macro_rules! change_map {
    ($($old:literal $(=> $new:literal)?),* $(,)?) => {{
        #[allow(unused_mut)]
        let mut m = ChangeMap::new();
        $(
            m.insert($old, option_expr!($($new)?));
        )*
        m
    }};
}

fn version_changes() -> HashMap<&'static str, ChangeMap> {
    HashMap::from([
        (
            "inferno",
            change_map![
                "SmallShippingContainer",
                "MetalBeamPlatform",
                "SandbagPlatform",
                "BarbedWirePlatform",
                "FieldATDamageC" => "FieldCannonDamageC",
                "FieldCannonDamageW" => "FieldATDamageW",
                "EmplacedMachineGun" => "EmplacedInfantryW",
                "EmplacedAT" => "EmplacedATW",
            ],
        ),
        (
            "inferno-52",
            change_map![
                "ArmoredCarMobilityC" => "TanketteC",
                "Concrete",
                "CrudeOil",
                "GarrisonSupplies" => "MaintenanceSupplies",
                "SatchelCharge" => "SatchelChargeW",
                "Water",
            ],
        ),
        (
            "naval",
            change_map![
                "FieldMultiW" => "LargeFieldMultiW",
                "FieldLightArtilleryC" => "LargeFieldLightArtilleryC",
                "TroopShip",
            ],
        ),
        (
            "naval-56",
            change_map![
                "ArmoredCarOffensiveW" => "ArmoredCar2LargeW",
                "ArmoredCarTwinW" => "ArmoredCar2TwinW",
                "FuelContainer" => "LiquidContainer",
                "OilTankerC" => "TruckLiquidC",
                "OilTankerW" => "TruckLiquidW",
                "SmallTrainDump" => "SmallTrainMaterial",
                "SmallTrainFuelContainer" => "SmallTrainLiquid",
                "SmallTrainResourcePlatform" => "SmallTrainResource",
                "TruckDumpC" => "TruckResourceC",
                "TruckDumpW" => "TruckResourceW",
            ],
        ),
        (
            "naval-57",
            change_map!["Explosive", "HeavyExplosive", "Freighter",],
        ),
        ("infantry-59", change_map!["Shotgun", "SoldierSupplies",]),
        (
            "infantry-60",
            change_map!["BunkerSupplies", "SniperRifleAmmo",],
        ),
        ("infantry-61", change_map!["HERocketAmmo",]),
        ("airborne-63", change_map![]),
    ])
}

/// Migrate a code name through version history. Returns `None` if the item
/// was removed in a later version, or `Some(current_name)` after all renames.
fn map_code_name_if_changed(
    changes: &HashMap<&str, ChangeMap>,
    stockpile_version: &str,
    code_name: &str,
) -> Option<String> {
    let start = VERSION_HISTORY
        .iter()
        .position(|&v| v == stockpile_version)
        .expect("unknown stockpile version")
        + 1;

    let mut current = code_name.to_string();

    for &version in &VERSION_HISTORY[start..] {
        if let Some(ver_map) = changes.get(version) {
            if let Some(change) = ver_map.get(current.as_str()) {
                match change {
                    None => return None,
                    Some(new_name) => current = new_name.to_string(),
                }
            }
        }
    }

    Some(current)
}

// ── Test runner ────────────────────────────────────────────────────────

fn crated_label(is_crated: Option<bool>) -> &'static str {
    match is_crated {
        Some(true) => "crated",
        Some(false) => "individual",
        None => "unknown",
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let start = Instant::now();
    unsafe {
        std::env::set_var("RTEN_NUM_THREADS", "1");
    }
    // /.../fir/native/target/{debug,release}/exename -> /.../fir/
    let fir_path = std::env::current_exe()?
        .ancestors()
        .nth(4)
        .unwrap()
        .to_path_buf();
    let args = parse_args();
    let changes = version_changes();

    let version = &args.version;

    let ocr = Ocr::new_from_paths(fir_path.join("includes/text-recognition-model.onnx"))?;

    let mut icon_classifier = Classifier::new_from_paths(
        fir_path.join(format!("foxhole/{version}/classifier/model.onnx")),
        (32, 32),
        3,
        fir_path.join(format!("foxhole/{version}/classifier/class_names.json")),
    )?;

    let mut quantity_classifier = Classifier::new_from_paths(
        fir_path.join("includes/quantities/model.onnx"),
        (16, 21),
        1,
        fir_path.join("includes/quantities/class_names.json"),
    )?;

    // ── Load expected stockpiles ───────────────────────────────────────
    let json_path = args.data.join("stockpiles.json");
    let json_text = fs::read_to_string(&json_path)?;
    let expected_stockpiles: Vec<ExpectedStockpile> = serde_json::from_str(&json_text)?;

    let mut failures: Vec<String> = Vec::new();
    let mut total: usize = 0;

    for expected in &expected_stockpiles {
        let screenshot_path = args.data.join("screenshots").join(&expected.file);
        let label = &expected.file;

        // Load image and run extraction
        let bytes = fs::read(&screenshot_path)?;
        let image = image::load_from_memory(&bytes)?.into_rgba8();
        let width = image.width() as usize;

        let stockpile = extract_stockpile(
            &image,
            width,
            &ocr,
            &mut icon_classifier,
            &mut quantity_classifier,
        )?;

        let stockpile = match stockpile {
            Some(s) => s,
            None => {
                total += 1;
                failures.push(format!("{label}: extraction returned no stockpile"));
                continue;
            }
        };

        // ── Bounds ─────────────────────────────────────────────────────
        {
            total += 1;
            let b = &stockpile.bounds;
            let e = &expected.bounds;
            if b.x != e.x || b.y != e.y || b.width != e.width || b.height != e.height {
                failures.push(format!(
                    "{label}: stockpile box expected x:{} y:{} w:{} h:{}, got x:{} y:{} w:{} h:{}",
                    e.x, e.y, e.width, e.height, b.x, b.y, b.width, b.height,
                ));
            }
        }

        // ── Structure type ─────────────────────────────────────────────
        {
            total += 1;
            let actual_type = stockpile
                .header
                .as_ref()
                .and_then(|h| h.structure_type.value.as_deref());

            match (&expected.header.structure_type, actual_type) {
                (Some(expected_type), Some(actual)) => {
                    if actual != expected_type.as_str() {
                        failures.push(format!(
                            "{label}: structure type expected '{expected_type}', got '{actual}'",
                        ));
                    }
                }
                (Some(expected_type), None) => {
                    failures.push(format!(
                        "{label}: expected structure type '{expected_type}', got none",
                    ));
                }
                (None, Some(actual)) => {
                    failures.push(format!(
                        "{label}: expected no structure type, got '{actual}'",
                    ));
                }
                (None, None) => {}
            }
        }

        // ── Stockpile name ─────────────────────────────────────────────
        {
            total += 1;
            let actual_name = stockpile
                .header
                .as_ref()
                .and_then(|h| h.stockpile_name.as_ref())
                .and_then(|sn| sn.value.as_deref());

            match (&expected.header.name, actual_name) {
                (Some(expected_name), Some(actual)) => {
                    if actual != expected_name.as_str() {
                        failures.push(format!(
                            "{label}: stockpile name expected '{expected_name}', got '{actual}'",
                        ));
                    }
                }
                (Some(expected_name), None) => {
                    failures.push(format!(
                        "{label}: expected stockpile name '{expected_name}', got none",
                    ));
                }
                (None, Some(actual)) => {
                    failures.push(format!(
                        "{label}: expected no stockpile name, got '{actual}'",
                    ));
                }
                (None, None) => {}
            }
        }

        // ── Structure technologies ─────────────────────────────────────
        match (
            &expected.structure_technologies,
            &stockpile.structure_technologies,
        ) {
            (Some(expected_techs), Some(actual_techs)) => {
                total += 1;
                if actual_techs.len() != expected_techs.len() {
                    failures.push(format!(
                        "{label}: expected {} structure technologies, got {}",
                        expected_techs.len(),
                        actual_techs.len(),
                    ));
                }

                for (i, expected_tech) in expected_techs.iter().enumerate() {
                    total += 1;
                    if let Some(actual_tech) = actual_techs.get(i) {
                        // Compare as JSON values; adjust if your type differs.
                        let actual_value = serde_json::to_value(actual_tech)?;
                        if actual_value != *expected_tech {
                            failures.push(format!(
                                "{label}: structure technology index {i} mismatch: expected {expected_tech}, got {actual_value}",
                            ));
                        }
                    } else {
                        failures.push(format!("{label}: structure technology index {i} missing",));
                    }
                }
            }
            (Some(expected_techs), None) => {
                total += 1;
                failures.push(format!(
                    "{label}: expected {} structure technologies, got none",
                    expected_techs.len(),
                ));
            }
            (None, Some(actual_techs)) => {
                total += 1;
                failures.push(format!(
                    "{label}: expected no structure technologies, got {}",
                    actual_techs.len(),
                ));
            }
            (None, None) => {
                total += 1;
            }
        }

        // ── Contents ───────────────────────────────────────────────────
        for (index, expected_item) in expected.contents.iter().enumerate() {
            let mapped =
                map_code_name_if_changed(&changes, &expected.version, &expected_item.code_name);
            let expected_code_name = match mapped {
                Some(name) => name,
                None => continue, // item was removed in a later version
            };

            total += 1;
            let expected_crated = crated_label(Some(expected_item.is_crated));

            match stockpile.contents.get(index) {
                Some(actual_item) => {
                    let actual_crated = crated_label(actual_item.icon.is_crated);
                    let mut item_failures: Vec<String> = Vec::new();

                    let actual_code_name = actual_item.icon.code_name.as_deref().unwrap_or("");
                    if actual_code_name != expected_code_name {
                        item_failures.push(format!(
                            "code_name expected '{expected_code_name}', got '{actual_code_name}'",
                        ));
                    }
                    let actual_quantity = actual_item.quantity.value.unwrap_or(0);
                    if actual_quantity != expected_item.quantity {
                        item_failures.push(format!(
                            "quantity expected {}, got {}",
                            expected_item.quantity, actual_quantity,
                        ));
                    }
                    if actual_crated != expected_crated {
                        item_failures
                            .push(format!("expected {expected_crated}, got {actual_crated}",));
                    }

                    if !item_failures.is_empty() {
                        failures.push(format!(
                            "{label}: item[{index}] {} {expected_code_name} ({expected_crated}): {}",
                            expected_item.quantity,
                            item_failures.join("; "),
                        ));
                    }
                }
                None => {
                    failures.push(format!(
                        "{label}: item[{index}] {} {expected_code_name} ({expected_crated}): missing",
                        expected_item.quantity,
                    ));
                }
            }
        }

        // ── No extra items ─────────────────────────────────────────────
        {
            total += 1;
            let max_expected = expected.contents.len();
            if stockpile.contents.len() > max_expected {
                failures.push(format!(
                    "{label}: expected at most {} items, got {}",
                    max_expected,
                    stockpile.contents.len(),
                ));
            }
        }
    }

    // ── Report ─────────────────────────────────────────────────────────
    for failure in &failures {
        println!("FAIL: {failure}");
    }
    let seconds_elapsed = start.elapsed().as_secs_f64();
    let milliseconds_per_file = seconds_elapsed * 1000.0 / expected_stockpiles.len() as f64;
    println!(
        "{} failures / {} tests in {:.3}s ({} files at {:.0}ms/file)",
        failures.len(),
        total,
        seconds_elapsed,
        expected_stockpiles.len(),
        milliseconds_per_file
    );

    if !failures.is_empty() {
        std::process::exit(1);
    }

    Ok(())
}
