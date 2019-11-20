import BaseHttpService from './base-http.service';

class contactService extends BaseHttpService {

    async getContacts(){
        return await this.get('contact')
    }

    async saveContact(data){
        const options = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        return await this.post('contact', data, options)
    }

}

export default new contactService();