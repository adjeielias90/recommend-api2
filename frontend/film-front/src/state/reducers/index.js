
import { combineReducers } from "redux";
import originalMoviesReducer from "./originalMoviesReducer"
import romanceMoviesReducer from "./romanceMoviesReducer"
import comedyMoviesReducer from "./comedyMoviesReducer";
import selectedMovieReducer from "./selectedMovieReducer"
import userReducer from "./userReducer";
import relatedMoviesReducer from "./relatedMoviesReducer"
import forUserReducer from "./forUserReducer"
import watchedMoviesReducer from "./watchedMoviesReducer"


const reducers = combineReducers({
    TopMovies: originalMoviesReducer,
    romanceMovies: romanceMoviesReducer,
    comedyMovies:comedyMoviesReducer,
    selectedMovie : selectedMovieReducer,
    relatedMovies:relatedMoviesReducer,
    forUser:forUserReducer,
    watchedMovies:watchedMoviesReducer,
    user:userReducer
})

export default reducers;