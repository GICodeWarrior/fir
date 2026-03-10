use std::path::Path;

use rten::Model;
use rten_tensor::NdTensor;
use rten_tensor::prelude::*;

use crate::resizer::BicubicResizerFixed;
use crate::slicer::slice_rgba;
use crate::types::Bounds;

pub struct Classifier {
    model: Model,
    model_shape: (usize, usize),
    channels: u8,
    class_names: Vec<String>,

    per_item_size: usize,
    bicubic: BicubicResizerFixed,
}

impl Classifier {
    pub fn new_from_paths(
        model: impl AsRef<Path>,
        model_shape: (usize, usize),
        channels: u8,
        class_names: impl AsRef<Path>,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let json_class_names = std::fs::read_to_string(class_names)?;
        let parsed_class_names: Vec<String> = serde_json::from_str(&json_class_names)?;

        let loaded_model = Model::load_file(model.as_ref())?;

        Self::new(loaded_model, model_shape, channels, parsed_class_names)
    }

    pub fn new_from_data(
        model: Vec<u8>,
        model_shape: (usize, usize),
        channels: u8,
        class_names: Vec<String>,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let loaded_model = Model::load(model)?;

        Self::new(loaded_model, model_shape, channels, class_names)
    }

    pub fn new_from_static(
        model: &'static [u8],
        model_shape: (usize, usize),
        channels: u8,
        class_names: Vec<String>,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let loaded_model = Model::load_static_slice(model)?;

        Self::new(loaded_model, model_shape, channels, class_names)
    }

    fn new(
        model: Model,
        model_shape: (usize, usize),
        channels: u8,
        class_names: Vec<String>,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let per_item_size = model_shape.0 * model_shape.1 * channels as usize;
        let bicubic = BicubicResizerFixed::new();

        Ok(Self {
            model,
            model_shape,
            channels,
            class_names,
            per_item_size,
            bicubic,
        })
    }

    fn slice_and_resize(&mut self, rgba: &[u8], width: usize, bounds: &Bounds, out: &mut Vec<f32>) {
        let slice = slice_rgba(rgba, width, &bounds);
        let resized = self.bicubic.resize(
            &slice,
            bounds.width,
            bounds.height,
            self.model_shape.1,
            self.model_shape.0,
        );

        match self.channels {
            1 => {
                for chunk in resized.chunks_exact(4) {
                    out.push(chunk[0] as f32);
                }
            }
            3 => {
                for chunk in resized.chunks_exact(4) {
                    out.push(chunk[0] as f32);
                    out.push(chunk[1] as f32);
                    out.push(chunk[2] as f32);
                }
            }
            _ => panic!("channels must be 1 or 3"),
        }
    }

    pub fn batch_predict<'a, I>(
        &mut self,
        rgba: &[u8],
        width: usize,
        bounds: I,
    ) -> Result<Vec<String>, Box<dyn std::error::Error>>
    where
        I: ExactSizeIterator<Item = &'a Bounds>,
    {
        let batch_size = bounds.len();
        let mut batch: Vec<f32> = Vec::with_capacity(self.per_item_size * batch_size);

        for b in bounds {
            self.slice_and_resize(rgba, width, b, &mut batch);
        }

        let input = NdTensor::<f32, 4>::try_from_data(
            [
                batch_size,
                self.model_shape.0,
                self.model_shape.1,
                self.channels as usize,
            ],
            batch,
        )?;

        let output = self.model.run_one(input.into(), None)?;
        let logits: NdTensor<f32, 2> = output.try_into()?;

        let predictions = (0..batch_size)
            .map(|i| {
                let class_id = logits
                    .slice(i)
                    .iter()
                    .copied()
                    .enumerate()
                    .max_by(|(_, a), (_, b)| a.total_cmp(b))
                    .map(|(idx, _)| idx)
                    .unwrap();
                self.class_names[class_id].clone()
            })
            .collect();

        Ok(predictions)
    }
}
