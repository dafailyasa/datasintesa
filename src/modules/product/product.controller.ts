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
  Delete,
  Patch,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NextFunction, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../user/user.model';
import { createProduct, updateProduct } from './product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @UsePipes(ValidationPipe)
  @Post()
  async create(
    @Body() body: createProduct,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const data = await this.productService.create(body);

      return res.status(200).json({ result: data, status: 'success' });
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @Get(':id')
  async detailProduct(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const products = await this.productService.detail(id);

      return res.status(200).json({ result: products, status: 'success' });
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff, Role.Customer])

  @Get('')
  async listProduct(@Res() res: Response, @Next() next: NextFunction) {
    try {
      const products = await this.productService.list();

      return res.status(200).json({ result: products, status: 'success' });
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
    @Body() body: updateProduct,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.productService.update(id, body);

      return res.status(200).json({ result, status: 'success' });
    } catch (error) {
      next(error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [Role.Staff])
  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.productService.delete(id);

      return res.status(200).json({ result, status: 'success' });
    } catch (error) {
      next(error);
    }
  }
}
