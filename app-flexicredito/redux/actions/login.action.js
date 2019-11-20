import { loginConstant } from '../constants/login.constant'
import loginService from '../../services/auth.service';

export function request_login(payload) { return { type: loginConstant.DATA_LOGIN, payload } }
export function error_login(payload) { return { type: loginConstant.ERROR_LOGIN, payload } }
export function loading_login(payload) { return { type: loginConstant.LOADING_LOGIN, payload } }

export function login({ username, password }) {
    return dispatch => {
        dispatch(loading_login(true))
        return loginService.login({username, password})
            .then((data) => {
                console.log('asdasd', data);
                dispatch(request_login(data.data))
                dispatch(loading_login(false))
            })
            .catch( error => {
                dispatch(error_login(error))
                dispatch(loading_login(false))
            })
    }
}

