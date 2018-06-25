import { PROFILE_LOADING, GET_PROFILE, GET_ERRORS } from "./types";
import axios from "axios";


// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("/api/profile").catchthen(res =>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}