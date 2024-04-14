import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers() {
        const allUsers = await this.usersService.findAll();
        return allUsers.map((user) => {
            const { hashedPassword, ...rest } = user;
            return rest;
        });
    }

    @Get(':username')
    async getUserByUsername(@Param('username') username: string) {
        const user = await this.usersService.findUserByUsername(username);
        const { hashedPassword, ...rest } = user;
        return rest;
    }

    @Post('register')
    async registerUser(@Body() registerProps: RegisterUserDto): Promise<User> {
        try {
            const user = await this.usersService.create(registerProps);
            return user;
        } catch (error) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        }

    }

    @Post('delete')
    async deleteUser(@Body() id: string) {
        return this.usersService.delete(id);
    }

}
