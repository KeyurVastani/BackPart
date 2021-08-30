import { LOGIN } from "../action/type";

const initialState = {
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            debugger
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
