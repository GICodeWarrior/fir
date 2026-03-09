use serde::Serialize;

#[derive(Debug, Default, Serialize)]
pub struct Bounds {
    pub x: usize,
    pub y: usize,
    pub width: usize,
    pub height: usize,
}

impl Bounds {
    pub fn offset(&self, x: usize, y: usize) -> Bounds {
        Bounds {
            x: self.x + x,
            y: self.y + y,
            width: self.width,
            height: self.height,
        }
    }
}

macro_rules! impl_from_bounds {
    ($($T:ty),* $(,)?) => {
        $(
            impl From<Bounds> for $T {
                fn from(bounds: Bounds) -> Self {
                    Self { bounds, ..Default::default() }
                }
            }
        )*
    };
}

#[derive(Debug, Default, Serialize)]
pub struct StructureType {
    pub bounds: Bounds,
    pub value: Option<String>,
}

#[derive(Debug, Default, Serialize)]
pub struct StockpileName {
    pub bounds: Bounds,
    pub value: Option<String>,
}
impl_from_bounds!(StructureType, StockpileName);

#[derive(Debug, Serialize)]
pub struct Header {
    pub bounds: Bounds,
    pub structure_type: StructureType,
    pub stockpile_name: Option<StockpileName>,
}

#[derive(Debug, Serialize)]
pub struct StructureTechnology {
    pub bounds: Bounds,
    pub is_complete: bool,
}

#[derive(Debug, Default, Serialize)]
pub struct Icon {
    pub bounds: Bounds,
    pub code_name: Option<String>,
    pub is_crated: Option<bool>,
}

#[derive(Debug, Default, Serialize)]
pub struct Quantity {
    pub bounds: Bounds,
    pub label: Option<String>,
    pub value: Option<u32>,
}
impl_from_bounds!(Icon, Quantity);

#[derive(Debug, Serialize)]
pub struct Entry {
    pub icon: Icon,
    pub quantity: Quantity,
}

#[derive(Debug, Serialize)]
pub struct Stockpile {
    pub bounds: Bounds,
    pub header: Option<Header>,
    pub structure_technologies: Option<Vec<StructureTechnology>>,
    pub contents: Vec<Entry>,
}
