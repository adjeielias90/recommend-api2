import React, { useState, useEffect } from "react";
import './MovieDetail.css'
import { getRecommandationsByTitle } from "../../API/MovieAPI"

import StarRatingComponent from 'react-star-rating-component';

import { useSelector } from "react-redux"
import Row from "../Row/Row";

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"
import { getPoster } from "../../API/MovieAPI";


const base_url = "https://image.tmdb.org/t/p/original/";


const MovieDetail= () => {
  const [relatedMovies, setRelatedMovies]=useState([]);
  const { selectedMovie : movie } = useSelector((state) => state);
  
  

 
  useEffect(() => {
    getRecommandationsByTitle(movie.title).then(data=>Promise.all(data).then((values) => {
      console.log("Recomndation By Title",values);
      setRelatedMovies(values);
    })).catch(err => console.log(err))
      //setRelatedMovies(data)
    

    window.scrollTo({
        top:0,
        left: 0,
    behavior:"smooth"})
    
   
  }, [movie]);


  if(movie===undefined){
    return <p>loading...</p>
  }

  return (
     <div className="container">
       <div className="spacebet">
        <div className="content">
        
            <h1>{movie.title} </h1>
            <div className="tags">
              {movie.genres?.map(genre => 
                <div className="tag">{genre}</div>)}
            </div>
            <div className="nav">
                <ul>
                    <li>Story</li>
                    <li>Gallery</li>
                    <li>Cast</li>
                    <li>Info</li>
                    <li><i className="fas fa-share-alt"></i></li>
                </ul>
            </div>
            <p>{movie.overview ? movie.overview  : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"}</p>
            <div className="rating" style={{color:"white"}}>
       
                Rating<i className="fab fa-imdb big" ></i><i className="fab fa-imdb big" ></i>       
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          renderStarIcon={() => <span>&#9733;</span>}
          starCount={10}
          value={movie.vote_average}
        />  <i className="fab fa-imdb big" ></i>{movie.vote_average}
        <div className="rating" style={{color:"white"}}>
       
       Year<i className="fab fa-imdb big" ></i><i className="fab fa-imdb big" ></i>  {movie.year}     

   </div>
            </div>
            
            <div className="btn-box">
                <a href="#"><i className="fab fa-google-play"></i> Watch Trailer</a>
                <a href="#"><i className="fas fa-users"></i>Customer Review</a>
            </div>
        </div >
        
        <img className="image" src={movie.image} alt={movie.title}/>
        
        </div>
        <Row
        isLargeRow
        title="Related Videos"
        movies={relatedMovies}
      />
    </div>

   
     
  );

}

export default MovieDetail;