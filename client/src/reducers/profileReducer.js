import { GET_PROFILE, PROFILE_LOADING } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
    profile: null,
    profiles: {}, // array of profiles
    loading: false // solange Daten geholt werden, wird loading auf true gesetzt.
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        default:
            return state;
    }
}