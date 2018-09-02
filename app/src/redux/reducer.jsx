import {combineReducers} from 'redux';
import {counter} from './counter';
import {auth} from '../auth/Auth.redux.jsx'
import {user} from './user.redux'
export default combineReducers({user, counter, auth})