import { ActionTypes } from "../constants/action-types";

const initialState = {};

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SELECTED_MOVIE:
            return payload;
        case ActionTypes.DELETE_SELECTED_MOVIE:
            return initialState;
        default:
            return state
    }
}

export default reducer;