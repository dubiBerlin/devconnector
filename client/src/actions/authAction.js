import { GET_ERRORS } from "./types";
import axios from "axios";


// REGISTER User
// Die funtion die aufgerufen wird wenn man sich registrieren möchte
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