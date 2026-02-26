import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';

// type JwtPayload = { sub: string; email: string };
type JwtPayload = { sub: string; email: string; role: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      // secretOrKey: config.get<string>('JWT_SECRET') || '',
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') || '',
    });
  }

  // async validate(payload: any) {
  //   console.log("JWT payload:", payload);
  //   return payload;
  // }
  validate(payload: JwtPayload) {
    // return { userId: payload.sub, email: payload.email };
    console.log('JWT payload:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
