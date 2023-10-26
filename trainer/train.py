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
import os
import sys


EPOCHS = int(sys.argv[1])
COLOR_MODE = sys.argv[2]
DROPOUT=float(sys.argv[3])
VALIDATION_SPLIT=float(sys.argv[4])
DATA_DIR = sys.argv[5]

IMG_SIZE = (32, 32)

PREFETCH_SIZE = tf.data.AUTOTUNE
RANDOM_SEED = 639936

tf.keras.utils.set_random_seed(RANDOM_SEED)
tf.config.experimental.enable_op_determinism()

train_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=VALIDATION_SPLIT,
  subset='training',
  seed=RANDOM_SEED,
  color_mode=COLOR_MODE,
  image_size=IMG_SIZE
)

val_ds = keras.utils.image_dataset_from_directory(
  DATA_DIR,
  validation_split=VALIDATION_SPLIT,
  subset='validation',
  seed=RANDOM_SEED,
  color_mode=COLOR_MODE,
  image_size=IMG_SIZE
)

class_names = train_ds.class_names
output_dim = len(class_names)

with open('class_names.json', 'w', encoding='utf-8') as f:
  f.write(json.dumps(class_names, indent=2));
  f.write('\n');

raw_counts = dict()
total_files = 0
for root, dirs, files in os.walk(DATA_DIR):
  if root == DATA_DIR:
    continue
  raw_counts[root[len(DATA_DIR):]] = len(files)
  total_files += len(files)

class_weights = dict()
for index, name in enumerate(class_names):
  class_weights[index] = total_files / (output_dim * raw_counts[name])
  #print('Total: ' + str(total_files) + ', Class: ' + name + ', Count: ' + str(raw_counts[name]) + ', Weight: ' + str(class_weights[index]))

train_ds = train_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)
val_ds = val_ds.cache().prefetch(buffer_size=PREFETCH_SIZE)

model = Sequential([
#  layers.RandomBrightness(0.05),
#  layers.RandomContrast(0.05),
  layers.Rescaling(1./255, input_shape=IMG_SIZE + (3,)),
  layers.Conv2D(16, 3, padding='same', use_bias=False),
  layers.BatchNormalization(),
  layers.Activation('relu'),
  layers.MaxPooling2D(),
  layers.GaussianDropout(DROPOUT),
  layers.Conv2D(32, 3, padding='same'),
  layers.Activation('relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same'),
  layers.Activation('relu'),
  layers.MaxPooling2D(),
  layers.Dropout(DROPOUT),
  layers.Flatten(),
#  layers.Dense(256, activation='relu'), # used by quantity model but not icon model
  layers.Dense(output_dim, name='outputs')
])

model.compile(
  optimizer='adam',
  loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'],
  #steps_per_execution='auto',
)

early_stopping = keras.callbacks.EarlyStopping(
  monitor='loss',
  patience=7,
  restore_best_weights=True,
)

model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=EPOCHS,
  callbacks=[early_stopping],
  class_weight=class_weights,
)

model.save('model.keras')
