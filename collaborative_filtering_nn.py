# Source:
# https://keras.io/examples/structured_data/collaborative_filtering_movielens/
import pandas as pd
import numpy as np
from zipfile import ZipFile
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from pathlib import Path
import matplotlib.pyplot as plt
import json

keras_datasets_path = './datasets'
movielens_dir = './datasets/ml-latest-small'

ratings_file = './datasets/ml-latest-small/ratings.csv'
df = pd.read_csv(ratings_file)

movie_df = pd.read_csv('./datasets/ml-latest-small/movies.csv')

ratings_file = './datasets/ml-latest-small/ratings.csv'
model = keras.models.load_model('./models')

df = pd.read_csv(ratings_file)

user_ids = df["userId"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
userencoded2user = {i: x for i, x in enumerate(user_ids)}
movie_ids = df["movieId"].unique().tolist()
movie2movie_encoded = {x: i for i, x in enumerate(movie_ids)}
movie_encoded2movie = {i: x for i, x in enumerate(movie_ids)}
df["user"] = df["userId"].map(user2user_encoded)
df["movie"] = df["movieId"].map(movie2movie_encoded)

def set_default(obj):
  if isinstance(obj, set):
    return list(obj)
  raise TypeError


def recommended_movie(id):
  user_id = id
  movies_watched_by_user = df[df.userId == user_id]
  movies_not_watched = movie_df[
      ~movie_df["movieId"].isin(movies_watched_by_user.movieId.values)
  ]["movieId"]
  movies_not_watched = list(
    set(movies_not_watched).intersection(set(movie2movie_encoded.keys()))
  )
  movies_not_watched = [[movie2movie_encoded.get(x)] for x in movies_not_watched]
  user_encoder = user2user_encoded.get(user_id)
  user_movie_array = np.hstack(
    ([[user_encoder]] * len(movies_not_watched), movies_not_watched)
  )
  ratings = model.predict(user_movie_array).astype(np.float32).flatten()
  top_ratings_indices = ratings.argsort()[-10:][::-1]
  recommended_movie_ids = [
    movie_encoded2movie.get(movies_not_watched[x][0]) for x in top_ratings_indices
  ]

  top_movies_user = (
    movies_watched_by_user.sort_values(by="rating", ascending=False)
    .head(5)
    .movieId.values
  )
  movie_df_rows = movie_df[movie_df["movieId"].isin(top_movies_user)]

  movie_dict = []
  recommended_movies = movie_df[movie_df["movieId"].isin(recommended_movie_ids)]
  return recommended_movies.to_json(orient='records')


def collaborative_filtering3(id):
  prediction = recommended_movie(id)
  return prediction