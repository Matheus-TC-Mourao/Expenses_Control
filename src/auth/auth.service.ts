import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly user = {
    id: 'user-123',
    username: 'User',
    password: 'senha123',
  };

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username === this.user.username && password === this.user.password) {
      const { password, ...result } = this.user;
      return result;
    }
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }

  login(username: string, password: string) {
    const user = this.validateUser(username, password);
    const payload = { sub: user.id, username: user.username };
    const accessToken: string = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }
}
