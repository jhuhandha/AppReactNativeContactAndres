import axios from 'axios';

export default class BaseHttpService {
    BASE_URL = 'http://10.0.2.2:3006';
    _accesToken = null;

    constructor(){
        this._accesToken = this.getToken();
    }

    get(endpoint, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.get(`${this.BASE_URL}/${endpoint}`, options)
    }

    post(endpoint, data = {}, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
    }

    patch(endpoint, data = {}, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
    }

    delete(endpoint, options = {}){
        Object.assign(options, this._getAxiosOptions());
        return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
    }

    _getAxiosOptions() {
        const token = this._accesToken ? this._accesToken : this.getToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            },
        }
    }

    saveToken(accesToken){
        this._accesToken = accesToken;
    }

    getToken(){
        return this._accesToken
    }

    removeToken(){
        this._accesToken = null
    }

}