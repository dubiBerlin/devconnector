import { TEST_DISPATCH } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
}

// standardmäßig auf initialState gesetzt
export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
        // case SET_CURRENT_USER:
        //     return    
    }
}