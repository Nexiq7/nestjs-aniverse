import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByUsername(username);
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (user && isMatch) {
            const { hashedPassword, ...result } = user;
            return result;
        }
        return null;
    }

    async checkIfUserExists(username: string): Promise<any> {
        return this.usersService.findUserByUsername(username);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            _vercel_jwt: this.jwtService.sign(payload),
        };
    }
}
