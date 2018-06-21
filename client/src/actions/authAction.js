import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthtoken";
import jwt_decode from "jwt-decode";


// REGISTER User
// Die funtion die aufgerufen wird wenn man sich registrieren möchte
// history ist die 
export const registerUser = function (userData, history) {
    return function (dispatch) {
        axios.post("/api/users/register", userData)
            .then(res => history.push("/login"))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
}

// Login User
// Die funtion die aufgerufen wird wenn man sich registrieren möchte
// history ist die 
export const loginUser = function (userData, history) {
    return function (dispatch) {
        axios.post("/api/users/login", userData)
            .then(res => {
                // den token in localStorage speichern
                const token = res.data.token;
                // 
                localStorage.setItem("jwtToken", token);
                // Set token to auth header
                setAuthToken(token);
                // Token muss dekodiert werden weil er ja den usernamen, die user-id, email etc. enthält
                const decoded = jwt_decode(token);
                // den jetzigen User setzen
                dispatch(setCurrentUser(decoded));
                history.push("/login")
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }

}

// Se
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}