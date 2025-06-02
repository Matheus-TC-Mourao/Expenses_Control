import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  Hello() {
    return 'Hello auth';
  }

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async register(@Body() register: RegisterDto) {
    const user = await this.authService.register(register);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);
    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return { token };
  }
}
