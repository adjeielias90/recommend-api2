import { ActionTypes } from "../constants/action-types";

const initialState = {};

const reducer = ( state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.USER_SIGNED_IN:
            return payload;
        case ActionTypes.USER_SIGNED_OUT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;