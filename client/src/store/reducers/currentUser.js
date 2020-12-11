import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // will change to ture , when logged in
    user: {} // all the user info logged in
};

const errors =  (state = DEFAULT_STATE , action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                // turn empty object into false or if there are keys, then true
                isAuthenticated: !!Object.keys(action.user).length,
                user:action.user
            }
        default:
            return state;
    }

}

export default errors;