import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import dateReducer from './dateReducer'
import { RESET_STORE } from '../action/type'
import { clearStorage } from "../../helper/screenHelper";

const appReducer = combineReducers({
    loginReducer,
    dateReducer
})
const rootReducer = (state, action) => {
    debugger
    if (action.type === RESET_STORE) {
        debugger
        clearStorage()
        state = undefined;
    }
    return appReducer(state, action)
}
export default rootReducer;