import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
from surprise import Reader, Dataset, SVD
from surprise.model_selection import KFold
from surprise.model_selection import cross_validate
from content_based_movie_recommender import smd, indices, cosine_sim
import pickle as p

# reader = Reader()
ratings = pd.read_csv('./datasets/ratings_small.csv')
ratings.head()

# data = Dataset.load_from_df(ratings[['userId', 'movieId', 'rating']], reader)
# data.split(n_folds=5)
# kf = KFold(n_splits=5)
# data = kf.split(data)
modelfile = 'models/svd_model.pickle'
svd = p.load(open(modelfile, 'rb'))

# Use the famous SVD algorithm
# svd = SVD()

# Run 5-fold cross-validation and then print results
# cross_validate(svd, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

# trainset = data.build_full_trainset()
# svd.fit(trainset)

ratings[ratings['userId'] == 1]

# svd.predict(1, 302, 3)

def convert_int(x):
  try:
    return int(x)
  except:
    return np.nan

id_map = pd.read_csv('./datasets/links_small.csv')[['movieId', 'tmdbId']]
id_map['tmdbId'] = id_map['tmdbId'].apply(convert_int)
id_map.columns = ['movieId', 'id']
id_map = id_map.merge(smd[['title', 'id']], on='id').set_index('title')
#id_map = id_map.set_index('tmdbId')

indices_map = id_map.set_index('id')

def hybrid(userId, title):
  idx = indices[title]
  tmdbId = id_map.loc[title]['id']
  #print(idx)
  movie_id = id_map.loc[title]['movieId']
  
  sim_scores = list(enumerate(cosine_sim[int(idx)]))
  sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
  sim_scores = sim_scores[1:26]
  movie_indices = [i[0] for i in sim_scores]
  
  movies = smd.iloc[movie_indices][['title', 'vote_count', 'vote_average', 'year', 'id']]
  movies['est'] = movies['id'].apply(lambda x: svd.predict(userId, indices_map.loc[x]['movieId']).est)
  movies = movies.sort_values('est', ascending=False)
  return movies.head(10)


# print(hybrid(500, 'Avatar'))

def collaborative_filtering(id, movie):
  prediction = hybrid(id, movie)
  return prediction.to_json(orient='records')
