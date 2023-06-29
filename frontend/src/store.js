import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import streamReducer from './redux/streamSlice'

const rootReducer = combineReducers({
    stream: streamReducer
})

const store = configureStore({
    reducer: rootReducer
})

export { store };