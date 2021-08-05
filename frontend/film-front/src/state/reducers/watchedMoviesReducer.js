import { ActionTypes } from "../constants/action-types";

const initialState = [];

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_WATCHED_MOVIES:
            console.log(payload);
            return payload 
        default:
            return state;
    }
}

export default reducer;