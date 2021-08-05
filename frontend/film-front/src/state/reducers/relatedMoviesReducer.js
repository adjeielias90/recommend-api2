import { ActionTypes } from "../constants/action-types";

const initialState = [];

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_RELATED_MOVIES:
            console.log(payload,"related")
            return [...payload];
            
        default:
            return state
    }
}

export default reducer;