

const initialState = {
    isAuthenticated: false,
    user: {}
}

// standardmäßig auf initialState gesetzt
export default function (state = initialState, action) {
    switch (action.type) {

        default:
            return state;
        // case SET_CURRENT_USER:
        //     return    
    }
}