import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { warrantyController } from './warranty.controller';
import { Warranty, warrantySchema } from './warranty.model';
import { WarrantyService } from './warranty.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Warranty.name, schema: warrantySchema },
    ]),
    ProductModule,
  ],
  controllers: [warrantyController],
  providers: [WarrantyService],
  exports: [WarrantyService],
})
export class WarrantyModule {}
