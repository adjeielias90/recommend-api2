import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { getPoster } from "../../API/MovieAPI";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"


import "./Banner.css";
import { setRomanceMovies } from "../../state/action-creator";
const base_url = "https://image.tmdb.org/t/p/original/";

function Banner({ movie }) {

  const dispatch = useDispatch();
  const { setSelectedMovie  } = bindActionCreators({
    setSelectedMovie:actionCreators.setSelectedMovie,
    }, dispatch);


  const history = useHistory();
  const handleClick = () => {
    setSelectedMovie(movie);
    history.push({
      pathname: "/movie/" + movie?.vote_count
    });
  }
 
  
  return (
    <header style={{
      height:"500px",
      backgroundSize: "cover",
      backgroundImage: `url('${movie?.image}')`, 
      //optional chaining: no need to check if movie is undefined '?' saw this neat trick on stackoverflow
      backgroundPosition: "center center"
    }}>
     
<div className="banner__contents">
  <h1 className="banner__title">
    {/* i notice that some movies give u a title a name or an orginal name , api information isnt consistent   */}
    { movie?.title}
  </h1>
  <div className="banner__btns">
    <button className="banner__btn">Play</button>
    <button key={movie?.vote_count} className="banner__btn" onClick={()=>handleClick() }>More Info</button>
    
  </div>
  <p className="banner__description">{movie?.discription} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown </p>
</div>

<div className="banner--fadeBottom" />

     
    </header>
  );
}

export default Banner;
