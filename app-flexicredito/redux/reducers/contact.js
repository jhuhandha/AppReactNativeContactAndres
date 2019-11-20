import {contactConstant} from '../constants/contact.constant';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case contactConstant.DATA_CONTACTS:
      return {...state, data: action.payload};
    case contactConstant.LOADING_CONTACT:
      return {...state, loading: action.payload};
    case contactConstant.ERROR_CONTACT:
      return {...state, error: action.payload};
    case contactConstant.RESPUESTA_CONTACTS:
      return {...state, respuesta: action.payload};
    default:
      return {...state};
  }
}
