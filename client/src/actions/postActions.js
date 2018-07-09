
import {
    POST_LOADING,
    GET_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    GET_ERRORS
} from './types';
import axios from "axios";

// Add post
export const addPost = postdata => dispatch => {
    axios.post("/api/posts", postdata)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Add post
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios.post("/api/posts")
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};


export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

