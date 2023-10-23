import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authsService.login(req.user);
  }
}
