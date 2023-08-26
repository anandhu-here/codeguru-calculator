import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { user } from './reducers/user';
import { app } from './reducers/app';


// import { composeWithDevTools } from 'redux-devtools-extension';



const initialState = {};

const rootReducer = combineReducers({
    userState: user,
    appState: app

})



const middleware = [thunk]
export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))