import {combineReducers}  from 'redux'
import loginReducer from './loginReducer'
import dateReducer from './dateReducer'

export const appReducer= combineReducers({
    loginReducer,
    dateReducer
})