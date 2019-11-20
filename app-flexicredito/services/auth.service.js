import BaseHttpService from "./base-http.service";

class authService extends BaseHttpService {

    async login(data){
        return this.post('auth/login/', data)
    }

}

export default new authService()