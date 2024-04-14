import { Controller, Get, HttpException, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response({ passthrough: true }) res): Promise<void> {
        const { access_token } = await this.authService.login(req.user);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }).send({ status: 'Login Successful' });
    }

    @Get('logout')
    async logout(@Response() res): Promise<void> {
        res.clearCookie('access_token').send({ status: 'Logged out' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userExists = await this.authService.checkIfUserExists(req.user.username)
        if (userExists) {
            return req.user;
        }
    }

}
