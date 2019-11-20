import * as config from 'config';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from './model/user.model';
import { userCreateDto } from './dto/user-create.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ){}
    
    async getAllUsers(query): Promise<any>{
        let startRow = Number(query.startRow)
        let pageSize = Number(query.pageSize)
        const users = await this.userModel.find({}, ['-password'])
                                    .skip(startRow)
                                    .limit(pageSize).exec()
        const totalUsers = await this.userModel.countDocuments()
        return { users, totalUsers }
    }

    async findUser(email: string): Promise<IUser>{
        try{
            return await this.userModel.findOne({ email }).exec()
        }catch(Exception){
            return null
        }
    }

    async createUser(
        userCreateDto: userCreateDto
    ): Promise<IUser>{
        var { password } = userCreateDto;
        try{
            const salt = config.get('salt')
            password = await bcrypt.hash(password, salt)
        }catch(Exception){
            throw new Exception('Ocurrio un error al cifrar la contraseña')
        }
        userCreateDto['password'] = password
        const user = this.userModel(userCreateDto)
        try{
            return user.save()
        }catch(Exception){
            return null
        }
    }

}
