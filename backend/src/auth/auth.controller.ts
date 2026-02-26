import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupDto } from './dto/signup.dto';

import type { Response } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';

import { RefreshTokenGuard } from './guards/refresh-token.guard';

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

  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);

    res.cookie('token', result.access_token, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return result;
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
