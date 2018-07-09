import { ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST, GET_POST } from "../actions/types";

const initialState = {
    post: [],
    post: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.postss]
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        default:
            return state;
    }
}