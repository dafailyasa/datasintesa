import {
  Body,
  Controller,
  Next,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthService } from './auth.service';
import { SignDTO, signupDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() body: SignDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ){
    try {
      const accessToken = await this.authService.login(body);
      
      return res.status(200).json({accessToken});
    } catch (error) {
      next(error);
    }
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body() body: signupDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.authService.signUp(body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
