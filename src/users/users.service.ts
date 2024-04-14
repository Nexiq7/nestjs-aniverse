import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(registerProps: RegisterUserDto): Promise<User> {
        const user = new User();
        user.username = registerProps.username;

        const saltOrRounds = 10;
        const password = registerProps.password;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        user.hashedPassword = hashedPassword;

        user.email = registerProps.email;

        return this.usersRepository.save(user);

    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findUserByUsername(username: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { username }, relations: ['saved'] });

        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: string) {
        return this.usersRepository.delete(id);
    }
}