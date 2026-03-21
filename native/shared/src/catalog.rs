use crate::types::Entry;

use std::collections::HashSet;
use std::collections::HashMap;

use serde_json::Value;

pub struct Catalog {
    pub items: Vec<Value>
}

impl Catalog {
    pub fn new_from_json(json: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let items: Vec<Value> = serde_json::from_str(json)?;
        Ok(Self { items })
    }

    fn get_path<'a>(value: &'a Value, path: &str) -> Option<&'a Value> {
    let mut current = value;

    // trim leading dot: ".foo.bar" -> "foo.bar"
    let path = path.trim_start_matches('.');

    for key in path.split('.') {
        match current {
            Value::Object(map) => {
                current = map.get(key)?;
            }
            _ => return None,
        }
    }

    Some(current)
    }

    pub fn get_attributes(
        &self,
        entry: &mut Entry,
        includes: &HashSet<String>,
    ) {
        let Some(code_name) = entry.icon.code_name.as_deref() else {
            println!("Code Name missing");
            return;
        };

        let Some(item) = self.items.iter().find(|item| {
            item.get("CodeName")
                .and_then(|v| v.as_str())
                == Some(code_name)
        }) else {
            println!("No matching catalog item found");
            return;
        };

        let attrs = entry.attributes.get_or_insert_with(HashMap::new);
        for path in includes {
            if let Some(value) = Self::get_path(item, path) {
                attrs.insert(path.clone(), value.clone());
            }
        }
    }
}
