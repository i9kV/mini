import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/auth.dto';
import { SignupDto } from './dto/signup.dto';

import { AuthGuard } from '@nestjs/passport';

import { AccessTokenGuard } from './guards/access-token.guard';

import { RefreshTokenGuard } from './guards/refresh-token.guard';

import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getMe(@Req() req) {
    return req.user;
  }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req: any) {
    const { sub: userId, email, role, refreshToken } = req.user;

    return this.authService.refreshTokens(userId, email, role, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }
}
