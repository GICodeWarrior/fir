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
IMG_SIZE = (32, 32)
PREFETCH_SIZE = tf.data.AUTOTUNE
RANDOM_SEED = 639936

tf.keras.utils.set_random_seed(RANDOM_SEED)
tf.config.experimental.enable_op_determinism()

train_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=0.05,
  subset='training',
  seed=RANDOM_SEED,
  image_size=IMG_SIZE
)

val_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=0.05,
  subset='validation',
  seed=RANDOM_SEED,
  image_size=IMG_SIZE
)

class_names = train_ds.class_names
output_dim = len(class_names)

with open('class_names.json', 'w', encoding='utf-8') as f:
  f.write(json.dumps(class_names, indent=2));
  f.write('\n');

train_ds = train_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)
val_ds = val_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)

model = Sequential([
#  layers.RandomBrightness(0.05),
#  layers.RandomContrast(0.05),
  layers.Rescaling(1./255, input_shape=IMG_SIZE+(3,)),
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.BatchNormalization(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.BatchNormalization(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.BatchNormalization(),
  layers.Dropout(0.05),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(output_dim, name="outputs")
])

model.compile(
  optimizer='adam',
  loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy']
)

EPOCHS = 27
model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=EPOCHS
)

model.save('model.h5')
