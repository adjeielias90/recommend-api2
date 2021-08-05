import React , { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/index";
import { useSelector } from "react-redux";

import axios from "axios";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Nav from "./components/Nav/Nav";
import * as API from "./API/MovieAPI"
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";

function App() {

  
    const dispatch = useDispatch();
    const { setTopMovies, setRomanceMovies, setComedyMovies } = bindActionCreators({
      setTopMovies:actionCreators.setTopMovies,
      setRomanceMovies:actionCreators.setRomanceMovies,
      setComedyMovies:actionCreators.setComedyMovies
      }, dispatch);

      const user  = useSelector((state) => state.user);

  

  useEffect(() => {
    
    API.fetchTopMovies().then(data=>Promise.all(data).then((values) => {
      console.log("topMovies",values);
      setTopMovies(values);


      API.fetchMoviesByGenre("romance").then(data=>Promise.all(data).then((values) => {
        console.log("romence",values);
        setRomanceMovies(values);

        API.fetchMoviesByGenre("comedy").then(data=>Promise.all(data).then((values) => {
          console.log("comedy",values);
          setComedyMovies(values);
        })).catch(err => console.log(err))


      })).catch(err => console.log(err))


    })).catch(err => console.log(err))
  
    
    
      //setRomanceMovies(data);
   
    
      //setComedyMovies(data);
   
    


  }, []);


 
 
  
  return (
    <div className="app">
      
      <Router>
      <Nav />
        <Switch>
           <Route exact path={"/"} component={()=> <Home/>} />
           <Route path={"/login"} component={SignIn} />
           <Route path={"/movie/:id"} component={MovieDetail} />
           <Redirect from="*" to="/" />
        </Switch>
      </Router>
      
     
    </div>
  );
}

export default App;
