import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auths.constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'custom-jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const token = req.headers.authorization;
    const payload = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: jwtConstants.secret,
    });
    return {
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
  }
}
