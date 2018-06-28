
import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS
} from './types';
import axios from "axios";


// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("/api/profile")
        .then(res =>
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

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profile", profileData)
        .then(res => history.push("./dashboard"))
        .catch({
            type: GET_ERRORS,
            payload: err.response.data
        });
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Profile loading
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}