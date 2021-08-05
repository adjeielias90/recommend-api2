import { ActionTypes } from "../constants/action-types";

export const setTopMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.SET_TOP_MOVIES,
            payload: movies
        });
    }
}


export const setRomanceMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_ROMANCE_MOVIES,
            payload: movies
        });
    }
}

export const setComedyMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_COMEDY_MOVIES,
            payload: movies
        });
    }
}
export const setRelatedMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.SET_RELATED_MOVIES,
            payload: movies
        });
    }
}
export const setWatchedMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.SET_WATCHED_MOVIES,
            payload: movies
        });
    }
}
export const setForUserMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.SET_FOR_USER_MOVIES,
            payload: movies
        });
    }
}

export const setSelectedMovie = (movie) => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.SET_SELECTED_MOVIE,
            payload: movie
        });
    }
}
export const deleteSelectedMovie = () => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.DELETE_SELECTED_MOVIE,
            payload: []
        });
    }
}



export const userSignedIn = (user) => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.USER_SIGNED_IN,
            payload: user
        });
    }
}

export const userSignedOut = () => {
    return (dispatch) => {
        dispatch({
            type:ActionTypes.USER_SIGNED_OUT
        });
    }
}