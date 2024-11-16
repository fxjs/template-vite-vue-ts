import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('logout')
  logout(@Body() body: { userId: string }) {
    const { userId } = body;
    return this.authService.logout(userId);
  }
}
