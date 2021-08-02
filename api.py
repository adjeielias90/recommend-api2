from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import pandas as pd
import json
import top_movies
from top_movies import get_top_10
from top_movies import get_top_by_genre
from content_based_movie_recommender import get_improved_recomendations_as_json
from collaborative_filtering_movie_recommender import collaborative_filtering


#Start API with api.py


app = Flask(__name__)


'''
  Our api test path.
  Returns just a simple string to indicate our API is running
  and ready to serve requests.

  example request:
  http://0.0.0.0:5000/api
'''
@app.route('/api/', methods=['GET'])
def api_root():
    data = request.get_json()
    prediction = 'message: API root, nothing here'
    return jsonify(prediction)


'''
  GET request that returns the top 10 json list of movies in our dataset.
  
  example request:
  http://0.0.0.0:5000/api/top_movies
'''
@app.route('/api/top_movies', methods=['GET'])
def get_top_movies():
  data = request.get_json()
  prediction = get_top_10()
  return prediction
  # return jsonify(prediction)


'''
  GET request that returns the top 10 json list of movies in particular genre.
  If not genre is supplied, it defaults to returning the top 10 movies of our dataset.

  example request:
  http://0.0.0.0:5000/api/top_movies/comedy
'''
@app.route('/api/top_movies/<genre>', methods=['GET'])
def get_top_movies_by_genre(genre):
  genre = str(genre).capitalize()
  prediction = get_top_by_genre(genre)
  return prediction


# How to parse POST request body with flask



'''
  POST request that returns the top 10 json list of movies based on a given title 
  of a movie as string and user_id as integer.

  example request:
  http://0.0.0.0:5000/api/filter/collaborative
  
  params/body: 
  {
    title: String,
    id: Integer
  }
'''
@app.route('/api/filter/collaborative', methods=['POST'])
def get_collaborative_filtering():
    data = request.get_json()
    id = data.get('id', '')
    title = data.get('title', '')
    prediction = collaborative_filtering(id, title)

    return prediction



'''
  POST request that returns the top 10 json list of movies based on a given title 
  of a movie as string.

  example request:
  http://0.0.0.0:5000/api/filter/content_based
  
  params/body: 
  {
    title: String
  }
'''
@app.route('/api/filter/content_based', methods=['POST'])
def get_content_based_filtering():
    data = request.get_json()
    title = data.get('title', '')
    prediction = get_improved_recomendations_as_json(title)

    return prediction


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')