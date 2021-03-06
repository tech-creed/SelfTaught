import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./Reducers/rootReducer"
const middleware = applyMiddleware(thunk) 
const store = createStore(rootReducer,middleware)
export default store
