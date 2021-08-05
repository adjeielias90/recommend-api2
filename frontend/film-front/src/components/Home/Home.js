import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../../state/index"
import Banner from "../Banner/Banner";
import { getUserRecomandation, collaborativeFilter,getRecommandationsByTitle } from "../../API/MovieAPI"


import Row from "../Row/Row";
function Home() {

  const dispatch = useDispatch();
  const { deleteSelectedMovie, setWatchedMovies, setForUserMovies } = bindActionCreators({
    deleteSelectedMovie: actionCreators.deleteSelectedMovie,
    setWatchedMovies: actionCreators.setWatchedMovies,
    setForUserMovies:actionCreators.setForUserMovies
  }, dispatch);

  const { TopMovies, romanceMovies, comedyMovies, watchedMovies, forUser, user } = useSelector((state) => state);
  const [movie, setMovie] = useState({});
  let m = TopMovies[
    Math.floor(Math.random() * TopMovies.length)
  ];



  useEffect(() => {

    if (user !==undefined ) {
      const id = user[0]?.id;
      console.log(id)
      getUserRecomandation(id).then(data=>Promise.all(data).then((values) => {
        console.log("userRecomandation",values);
        setWatchedMovies(values);

        collaborativeFilter(id , "Memento").then(data=>Promise.all(data).then((values) => {
          console.log("Colaborativ Filter",values);
          setForUserMovies(values);
        })).catch(err => console.log(err))

        
      })).catch(err => console.log(err))
    

       
    }
    
    deleteSelectedMovie();
    setMovie(m);


  }, [TopMovies])

  if (TopMovies.length === 0) {
    return null;
  }
  return (
    <>

      <Banner movie={movie} />
      <Row
        isLargeRow
        title="Top Movies"
        movies={TopMovies}
      />
      {Object.keys(user).length === 0 ?
        <Row
        isLargeRow
          title={"Romance Movies"}
          movies={romanceMovies}
        />
        :
        <Row
        isLargeRow
          title={"Watched Movies"}
          movies={watchedMovies}
        />}



      {Object.keys(user).length === 0 ?
        <Row
        isLargeRow
          title={"Comedy Movies"}
          movies={comedyMovies}
        />
        :
        <Row
        isLargeRow
          title="Suggested For You"
          movies={forUser}
        />}





    </>
  );
}

export default Home;
