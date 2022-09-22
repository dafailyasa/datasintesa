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
  Patch,
  SetMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../user/user.model';
import { claimedWarranty, createWarranty } from './warranty.dto';
import { WarrantyService } from './warranty.service';
import mongoose from "mongoose";
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('warranty')
export class warrantyController {
  constructor(private readonly warrantyService: WarrantyService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @UsePipes(ValidationPipe)
  @Post()
  async createWarranty(
    @Body() body: createWarranty,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      if(!mongoose.Types.ObjectId.isValid(body.productId)) throw new HttpException("productId is Not Valid format", HttpStatus.BAD_REQUEST);

      const data = await this.warrantyService.create(body);

      return res.status(200).json({ result: data, status: 'success' });
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @UsePipes(ValidationPipe)
  @Get('list')
  async list(
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.warrantyService.listWarrantys();

      return res.status(200).json({ result, status: "success" });
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: claimedWarranty,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.warrantyService.claimedWarranty(body, id);

      return res.status(200).json({ result, status: "success" });
    } catch (error) {
      next(error);
    }
  }
}
