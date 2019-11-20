import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { IUser } from '../user/model/user.model'

@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService
    ) { }

    async validatePassword(
        password: string, user: IUser
    ): Promise<boolean> {
        const hash = await bcrypt.hash(password, config.salt);
        return hash === user.password
    }

    async validateUser(
        email: string,
        password: string
    ): Promise<any> {
        try {
            const user = await this._userService.findUser(email)
            const validate = await this.validatePassword(password, user)
            if (user && validate) {
                return user
            }
            return null
        } catch (Exception) {
            return null
        }
    }

    async login(user: any) {
        const payload = { 
            sub: user._id, 
            email: user.email, 
            identification: user.identification,
            type_user: user.type_user,
            user_id: user.user_id
        };
        return {
            access_token: this._jwtService.sign(payload),
        };
    }


}
