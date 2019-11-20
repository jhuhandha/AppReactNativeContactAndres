import { loginConstant } from '../constants/login.constant'

const initialState = {
    data: ''
}

export default function(state = initialState, action){
    switch(action.type){
        case loginConstant.DATA_LOGIN:
            return { ...state, 'data': action.payload }
        case loginConstant.LOADING_LOGIN:
            return { ...state, 'loading': action.payload }
        case loginConstant.ERROR_LOGIN:
            return { ...state, 'error': action.payload }
        default:
            return { ...state }
    }
}