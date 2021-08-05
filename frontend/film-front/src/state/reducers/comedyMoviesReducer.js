import { ActionTypes } from "../constants/action-types";

const initialState = [];

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_COMEDY_MOVIES:
            console.log(payload,"comedy movies")
            return payload
        default:
            return state
    }
}

export default reducer;