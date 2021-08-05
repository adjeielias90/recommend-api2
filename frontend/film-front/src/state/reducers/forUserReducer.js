import { ActionTypes } from "../constants/action-types";

const initialState = [];

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_FOR_USER_MOVIES:
            return payload
        default:
            return state
    }
}

export default reducer;