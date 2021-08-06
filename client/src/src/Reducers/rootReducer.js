import { combineReducers } from 'redux'
import AuthReducer from './authReducer'
const rootReducer = combineReducers({
    auth:AuthReducer
})
export default rootReducer