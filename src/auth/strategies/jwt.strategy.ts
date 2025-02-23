import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWTFromCookie,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SIGNING_SECRET,
        });
    }


    private static extractJWTFromCookie(@Request() req): string | null {
        if (req.cookies && req.cookies._vercel_jwt) {
            return req.cookies._vercel_jwt;
        }
        return null;
    }

    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}