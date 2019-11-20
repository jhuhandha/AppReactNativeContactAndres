import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CreditoModule } from './credito/credito.module';
import { AgreementModule } from './agreement/agreement.module';
import { ContactModule } from './contact/contact.module';

import * as config from 'config';


const dbConfig = config.get('db')

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${dbConfig.host}/${dbConfig.database}`, { useNewUrlParser:true, autoIndex: false }),
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    UserModule,
    AuthModule,
    CreditoModule,
    AgreementModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
