import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import * as config from 'config';

const configJwt = config.get('jwt')

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configJwt.secret,
        })
    }

    async validate(payload: any) {
        return { 
            _id: payload.sub, 
            email: payload.email,
            identification: payload.identification,
            type_user: payload.type_user,
            user_id: payload.user_id
        };
    }
}