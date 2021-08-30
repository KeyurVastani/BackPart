import axios from "../../axios";

import { LOGIN } from "./type";

export const login = (email, password) => {    //2 step
    return (dispatch) => {
        debugger
        axios
            .post("/login", { email ,password})
            .then((response) => {
                debugger
                dispatch({
                    type: LOGIN,
                    payload: response.data,

                });console.log(response.data);

            })
            .catch((err) => {
                debugger
             });
    };
};