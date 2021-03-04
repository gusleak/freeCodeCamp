import tensorflow as tf
import pandas as pd
from tensorflow import keras
import tensorflow_datasets as tfds
import numpy as np
import matplotlib.pyplot as plt

!wget https://cdn.freecodecamp.org/project-data/sms/train-data.tsv
!wget https://cdn.freecodecamp.org/project-data/sms/valid-data.tsv

train_file_path = "train-data.tsv"
test_file_path = "valid-data.tsv"

train_ds = pd.read_csv(train_file_path, sep ='\t',names=["label", "message"])
test_ds = pd.read_csv(test_file_path, sep ='\t',names=["label", "message"])

train_ds['label'] = train_ds['label'].map({'spam': 1, 'ham': 0})
test_ds['label'] = test_ds['label'].map({'spam': 1, 'ham': 0})

msg_train = train_ds['message'].values
label_train = train_ds['label'].values
msg_test = test_ds['message'].values
label_test = test_ds['label'].values

t = keras.preprocessing.text.Tokenizer()
t.fit_on_texts(msg_train)

encoded_train = t.texts_to_sequences(msg_train)
encoded_test = t.texts_to_sequences(msg_test)

max_length = 100
padded_train = keras.preprocessing.sequence.pad_sequences(encoded_train, maxlen=max_length, padding='post')
padded_test = keras.preprocessing.sequence.pad_sequences(encoded_test, maxlen=max_length, padding='post')
vocab_size = len(t.word_index) + 1
embedding_dim=50

model = keras.Sequential()
model.add(keras.layers.Embedding(input_dim=vocab_size, output_dim=embedding_dim, input_length=max_length))
model.add(keras.layers.GlobalMaxPool1D())
model.add(keras.layers.Dense(10, activation='relu'))
model.add(keras.layers.Dense(1, activation='sigmoid'))

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

early_stop = keras.callbacks.EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=10)
model.fit(x=padded_train,
         y=label_train,
         epochs=50,
         validation_data=(padded_test, label_test), verbose=1,
         callbacks=[early_stop]
         )

def predict_message(pred_text):
  pred_text_proc = t.texts_to_sequences([pred_text])
  pred_text_proc = keras.preprocessing.sequence.pad_sequences(pred_text_proc, maxlen=max_length, padding='post')
  pred = (model.predict(pred_text_proc) > 0.5).astype("int32").item()

  if pred == 0:
    prediction = [pred, 'ham']
  else:
    prediction = [pred, 'spam']
  return (prediction)

def test_predictions():
  test_messages = ["how are you doing today",
                   "sale today! to stop texts call 98912460324",
                   "i dont want to go. can we try it a different day? available sat",
                   "our new mobile video service is live. just install on your phone to start watching.",
                   "you have won £1000 cash! call to claim your prize.",
                   "i'll bring it tomorrow. don't forget the milk.",
                   "wow, is your arm alright. that happened to me one time too"
                  ]

  test_answers = ["ham", "spam", "ham", "spam", "spam", "ham", "ham"]
  passed = True

  for msg, ans in zip(test_messages, test_answers):
    prediction = predict_message(msg)
    print(prediction)

test_predictions()
