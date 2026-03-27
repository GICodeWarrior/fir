use serde_json::{Value, json};

use crate::types::JsonObject;

pub struct Catalog {
    entries: Vec<JsonObject>,
}

impl Catalog {
    pub fn new_from_json(json: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let entries: Vec<JsonObject> = serde_json::from_str(json)?;
        Ok(Self { entries })
    }

    fn get_path<'a>(entry: &'a JsonObject, path: &[String]) -> Option<&'a Value> {
        let (first, rest) = path.split_first()?;
        let mut current = entry.get(first)?;
        for key in rest {
            current = current.get(key)?;
        }
        Some(current)
    }

    pub fn merge_attributes(
        &self,
        code_name: &str,
        paths: &[Vec<String>],
        attributes: &mut JsonObject,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let entry = self
            .entries
            .iter()
            .find(|entry| entry.get("CodeName").and_then(Value::as_str) == Some(code_name))
            .ok_or("No matching catalog item found.")?;

        for path in paths {
            let (last_key, object_keys) = path.split_last().ok_or("Received empty path")?;
            if let Some(attribute_value) = Self::get_path(entry, path) {
                let mut parent: &mut JsonObject = attributes;
                for key in object_keys.iter() {
                    parent = parent
                        .entry(key)
                        .or_insert(json!({}))
                        .as_object_mut()
                        .ok_or(format!("Expected nested value to be an object ({key})"))?;
                }
                parent.insert(last_key.to_string(), attribute_value.clone());
            }
        }

        Ok(())
    }
}
