import { Alert } from "react-native";
import axios from "../../axios";
import { clearStorage } from "../../helper/screenHelper";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { LOGIN, RESET_STORE } from "./type";

export const login = (email, password) => {    //2 step
    return (dispatch) => {
        // debugger
        axios
            .post("/login", { email, password })
            .then((response) => {
                // debugger
                dispatch({
                    type: LOGIN,
                    payload: response.data,

                });
                console.log(response.data);

            })
            .catch((err) => {
                // console.log("error", err?.response)
                dispatch({
                    type: LOGIN,
                    payload: err?.response?.data,

                });
                Alert.alert("Error", err?.response?.data?.error)
            });
    };
};


export const onLogout = () => {
    return dispatch => {
       dispatch({ type: RESET_STORE });
    };
 }
;
    // const res = await clearStorage()
    // if (res === "Success") {
    //     return () => {
    //         debugger
    //         dispatch({
    //             type: RESET_STORE
    //         })
    //     }
    // }
    // else {
    //     console.log("In else")
    // }
