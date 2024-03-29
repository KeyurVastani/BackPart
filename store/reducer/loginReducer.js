import { LOGIN, RESET_STORE } from "../action/type";

const initialState = {
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
