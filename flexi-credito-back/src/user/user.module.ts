import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userSchema } from './model/user.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema, collection: 'users' },
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
