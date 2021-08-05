import os
import requests

import requests
import urllib
import urllib.parse
import imdb
from requests.api import get
import json

def imdb_id_from_title(title):
    """ return IMDb movie id for search string
        
        Args::
            title (str): the movie title search string
        Returns: 
            str. IMDB id, e.g., 'tt0095016' 
            None. If no match was found
    """
    # creating instance of IMDb
    ia = imdb.IMDb()
      
    # name 
    # name = "Udta punjab"
      
    # searching the name 
    search = ia.search_movie(title)
      
      
    # loop for printing the name and id
    # for i in range(len(search)):
      # getting the id
    if (len(search)>0):
      id = search[0].movieID
    else:
      id = 'none'         
      # printing it
      # print(search[i]['title'] + " : " + id )
    return id



CONFIG_PATTERN = 'http://api.themoviedb.org/3/configuration?api_key={key}'
IMG_PATTERN = 'http://api.themoviedb.org/3/movie/{imdbid}/images?api_key={key}' 
KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb'
            
def _get_json(url):
    r = requests.get(url)
    return r.json()
    
def _download_images(urls, path='.'):
    """download all images in list 'urls' to 'path' """

    for nr, url in enumerate(urls):
        r = requests.get(url)
        filetype = r.headers['content-type'].split('/')[-1]
        filename = 'poster_{0}.{1}'.format(nr+1,filetype)
        filepath = os.path.join(path, filename)
        with open(filepath,'wb') as w:
            w.write(r.content)

def get_poster_urls(imdbid):
    """ return image urls of posters for IMDB id
        returns all poster images from 'themoviedb.org'. Uses the
        maximum available size. 
        Args:
            imdbid (str): IMDB id of the movie
        Returns:
            list: list of urls to the images
    """
    config = _get_json(CONFIG_PATTERN.format(key=KEY))
    base_url = config['images']['base_url']
    sizes = config['images']['poster_sizes']

    """
        'sizes' should be sorted in ascending order, so
            max_size = sizes[-1]
        should get the largest size as well.        
    """
    def size_str_to_int(x):
        return float("inf") if x == 'original' else int(x[1:])
    max_size = max(sizes, key=size_str_to_int)

    posters = _get_json(IMG_PATTERN.format(key=KEY,imdbid=imdbid))['posters']
    poster_urls = []
    for poster in posters:
        rel_path = poster['file_path']
        url = "{0}{1}{2}".format(base_url, max_size, rel_path)
        poster_urls.append(url) 

    return poster_urls

def tmdb_posters(imdbid, count=None, outpath='./downloads'):    
    urls = get_poster_urls(imdbid)
    if count is not None:
        urls = urls[:count]
    _download_images(urls, outpath)


def get_poster_url(title):
  imdb = imdb_id_from_title(str(title))
  if(imdb == 'none'):
    poster = {title: 'No poster found'}
    return json.dumps(poster, indent=4)
  else:
    posters = get_poster_urls(str('tt'+imdb))
    poster = {title : posters[0]}
    return json.dumps(poster, indent=4)
  # return poster.to_json()

# if __name__=="__main__":
#   imdb = imdb_id_from_title('Die Hard')
#   posters = get_poster_urls(str('tt'+imdb))
#   print(posters[0])
  # print(imdb)
  # tmdb_posters('tt0095016')

#https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=goonies&callback=?