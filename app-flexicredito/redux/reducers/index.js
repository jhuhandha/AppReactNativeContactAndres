import { combineReducers } from 'redux';
import login from './login';
import contact from './contact';

export default combineReducers({
    login,
    contact
});
