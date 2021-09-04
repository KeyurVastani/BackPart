import { CHECK_IN_DATE, CHECK_OUT_DATE } from "../action/DateAction";


const initialState = {
    indate: '2021-2-2',
    outdate: '2021-2-2'
}

function dateReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_IN_DATE:
            return { ...state, indate: action.payload }
        case CHECK_OUT_DATE:
            return { ...state, outdate: action.payload }
        default:
            return state;
    }
}


export default dateReducer