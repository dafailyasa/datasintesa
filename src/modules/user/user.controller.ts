import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Res,
  Next,
  ValidationPipe,
  UsePipes,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { updatePasswordDTO, updateStatus } from './user.dto';
import { Role } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @Get()
  async users(
    @Query() query: any,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const status = query.status;
      const result = await this.usersService.users(status);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async detailUser(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const user = await this.usersService.findUserById(id);

      return res.status(200).json({ result: user, status: "success" });
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() body: updatePasswordDTO,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.usersService.updatePassword(body.password, id);

      return res.status(200).json({ result, status: 'success' });
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @UsePipes(ValidationPipe)
  @Post(':id/status')
  async approveOrRejectUser(
    @Param('id') id: string,
    @Body() body: updateStatus,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.usersService.updateStatus(body.password, id);

      return res.status(200).json({ result, status: 'success' });
    } catch (error) {
      next(error);
    }
  }
}
