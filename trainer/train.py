#@title Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Based on this tutorial:
# https://www.tensorflow.org/tutorials/images/classification

import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

import json


DATA_DIR = '../catalog/training/'
RANDOM_SEED = 639936
IMG_SIZE = (32, 32)
PREFETCH_SIZE = tf.data.AUTOTUNE

train_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=0.2,
  subset='training',
  seed=RANDOM_SEED,
  image_size=IMG_SIZE
)

val_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=0.2,
  subset='validation',
  seed=RANDOM_SEED,
  image_size=IMG_SIZE
)

class_names = train_ds.class_names
output_dim = len(class_names)

with open('class_names.js', 'w', encoding='utf-8') as f:
  f.write('var CLASS_NAMES = ');
  f.write(json.dumps(class_names, indent=2));
  f.write('\n');

train_ds = train_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)
val_ds = val_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)

model = Sequential([
  layers.Rescaling(1./255),
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Dropout(0.2),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(output_dim, name="outputs")
])

model.compile(
  optimizer='adam',
  loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy']
)

epochs = 15
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

model.save('model.h5')
