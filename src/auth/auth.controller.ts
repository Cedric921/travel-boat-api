import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Post('login-provider')
  loginProvider(@Body() data: { email: string }) {
    return this.authService.loginProvider(data);
  }

  @Post('register')
  register(@Body() data: any) {
    return this.authService.signup(data);
  }
}
