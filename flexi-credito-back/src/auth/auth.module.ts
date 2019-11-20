import * as config from 'config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

const configJwt = config.get('jwt')

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: configJwt.secret,
      signOptions: { expiresIn: configJwt.expiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
