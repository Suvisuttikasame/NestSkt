import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authsService: AuthsService) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.authsService.validateUser(username, password);

    if (!user) {
      throw new HttpException(
        'incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
