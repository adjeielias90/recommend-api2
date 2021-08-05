
import axios from "./axios";

import requests from "./requests";


const URL = "http://68c73100386e.ngrok.io/api";


   export const fetchTopMovies = async () => {
     
    let API_URI = URL+"/top_movies";
    
    return  await axios.get(API_URI)
    .then(req => req.data.map(m => getPoster(m.title).then( src=>{ m["image"]=src; return m })))
    .catch((err)=>console.log(err));
    
  }

  export const fetchMoviesByGenre = async (genre) => {
     
    let API_URI = URL+"/top_movies/"+genre;
    return  await axios.get(API_URI)
    .then(req => req.data.map(m => getPoster(m.title).then( src=>{ m["image"]=src; return m })))
    .catch((err)=>console.log(err));
    
  }


 export   const collaborativeFilter = async ( i, t ) => {
    const API_URI = URL+"/filter/collaborative";
    console.log(i,t);
    return  await axios.post(API_URI,{ id:i, title:t })
    .then(req => req.data.map(m => getPoster(m.title).then( src=>{ m["image"]=src; return m })))
    .catch((err)=>console.log(err));
    
  }

  export const getUserRecomandation = async ( id ) => {
    const API_URI = URL+"/filter/collaborative/user";
    return  await axios.post(API_URI,{ id })
    .then(req => req.data.map(m => getPoster(m.title).then( src=>{ m["image"]=src; return m })))
    .catch((err)=>console.log(err));
  }

  export const getRecommandationsByTitle = async (title) => {
    const API_URI = URL+"/filter/content_based";
    return  await axios.post(API_URI,{ title })
    .then(req => req.data.map(m => getPoster(m.title).then( src=>{ m["image"]=src; return m })))
    .catch((err)=>console.log(err));
  }


  export const getPoster = async ( title ) =>{
    const API_URI = URL+"/poster";
    return await axios.post(API_URI,{ title })
    .then(req => req.data[title])
    .catch((err)=>console.log(err));
    
  }

 

  



  