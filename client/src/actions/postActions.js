
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

// Delete post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Get post
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

// Add like
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res =>
            dispatch(getPosts())) // nach dem löschen des likes einfach wieder alle posts abrufen
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// remove like
export const removeLike = id => dispatch => {
    axios.delete(`/api/posts/unlike/${id}`)
        .then(res =>
            dispatch(getPosts())) // nach dem löschen des likes einfach wieder alle posts abrufen
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

