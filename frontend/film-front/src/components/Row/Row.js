import React, { useState, useEffect } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useHistory } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"

import { getPoster, getImageFromApi } from "../../API/MovieAPI";


const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, movies, isLargeRow }) {

  const [trailerUrl, setTrailerUrl] = useState('');
  const [playing, setPlaying] = useState('');
  

  const dispatch = useDispatch();
  const { setSelectedMovie } = bindActionCreators({
    setSelectedMovie:actionCreators.setSelectedMovie
    }, dispatch);
 
  const history = useHistory();
  const handleClick = (data) => {
    setSelectedMovie(data);
    history.push({
      pathname: "/movie/" + data.vote_count
    });
  }
  const youtubeOpts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const movieClicked = (moviename) => {
  if(moviename !== playing){
      setPlaying(moviename);
      movieTrailer(moviename)
        .then((url) => {
          const urlParamV = new URLSearchParams(new URL(url).search);
        
          setTrailerUrl(urlParamV.get("v"));
        })
        .catch((err) => {       
           setTrailerUrl(''); 
           console.log(err);});
      }
      else{ 
        setTrailerUrl(''); 
        setPlaying('');
      }
      
  };
 
  
  
 

  if(movies===undefined){
    return null;
  }

  
  return (
    
    <div className="row">
      <h2>{title}</h2>
       <div className="row__posters"> 
        {movies.map((movie) => (
          <>
           <div className=" banner__buttons" key={movie.vote_count}>
          
          <button key={movie.wr} className="button__info" onClick={() =>{
                movieClicked(movie.title )}  }>
          Watch Trailer    
           </button>
        
  
          
    </div>
          <img 
            onClick={()=>handleClick(movie)}
          
            key={movie.wr}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`} //use && if theres no else or : otherwise use ?
            src={movie.image}
            alt={movie.title}
          />

          </>
          
        ))}
       </div>
    
       
      {trailerUrl!==''  && <YouTube videoId={trailerUrl} opts={youtubeOpts} />}  
    </div>
  );
}




export default Row;