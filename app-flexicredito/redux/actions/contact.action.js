import { contactConstant } from '../constants/contact.constant';
import contactService from '../../services/contact.service';

export function respuesta_contact(payload){ return { type: contactConstant.RESPUESTA_CONTACTS, payload }}
export function data_contact(payload){ return { type: contactConstant.DATA_CONTACTS, payload }}
export function loading_contact(payload){ return { type: contactConstant.LOADING_CONTACT, payload }}
export function error_contact(payload){ return { type: contactConstant.ERROR_CONTACT, payload }}

export function getContacts(){
    return dispatch => {
        dispatch(loading_contact(true))
        return contactService.getContacts()
            .then((data) => {
                dispatch(data_contact(data.data))
                dispatch(loading_contact(false))
            })
            .catch(error => {
                dispatch(loading_contact(false))
                dispatch(error_contact(error))
            })
    }
}

export function saveContact(data){
    return dispatch => {
        dispatch(loading_contact(true))
        return contactService.saveContact(data)
            .then((data) => {
                console.log(data)
                dispatch(respuesta_contact(data.data));
                dispatch(loading_contact(false))
            })
            .catch(error => {
                dispatch(loading_contact(false))
                dispatch(error_contact(error))
            })
    }
}