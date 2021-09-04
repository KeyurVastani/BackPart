export const CHECK_IN_DATE = 'CHECK_IN_DATE'
export const CHECK_OUT_DATE = 'CHECK_OUT_DATE'


export const setInDate = indate => dispatch => {
    dispatch({
        type: CHECK_IN_DATE,
        payload: indate
    })
}

export const setOutDate = outdate => dispatch => {
    dispatch({
        type: CHECK_OUT_DATE,
        payload: outdate
    })
}