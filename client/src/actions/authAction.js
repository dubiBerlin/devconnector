import { TEST_DISPATCH } from "./types";


// REGISTER User
export const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}