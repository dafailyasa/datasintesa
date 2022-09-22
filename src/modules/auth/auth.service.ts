import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SignDTO, signupDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user)
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.BAD_REQUEST,
      );

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw new HttpException(
        'Wrong credentials provided. Please login with correct password!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async login(user: SignDTO) {
    const access_token = await this.jwtService.sign(user);
    return access_token;
  }

  async signUp(user: signupDTO) {
    const result = await this.userService.create(user);
    return result;
  }

  async verify(token: string) {
    const decode = await this.jwtService.verify(token, {
      secret: this.configService.get<string>('jwt.secret'),
    });

    const user = await this.userService.findUserByEmail(decode.email);
    return user;
  }
}
