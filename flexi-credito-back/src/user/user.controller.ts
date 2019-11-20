import { Controller, Post, Get, Body, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { userCreateDto } from './dto/user-create.dto';
import { IUser } from './model/user.model';


@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ){}
    
    @Get()
    async getUsers(
        @Query() query: any
    ): Promise<any>{
        const data = await this._userService.getAllUsers(query)
        const { users, totalUsers } = data;
        return { users, totalUsers }
    }

    @Post()
    async createUser(
        @Body() userCreateDto: userCreateDto 
    ) : Promise<IUser>{
        const user = await this._userService.createUser(userCreateDto)
        if (!user) throw new HttpException("Ocurrio un error al crear el usuario", HttpStatus.BAD_REQUEST)
        else return user
    }

}
