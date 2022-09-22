import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { claimedWarranty, createWarranty } from './warranty.dto';
import { Warranty } from './warranty.model';

@Injectable()
export class WarrantyService {
  constructor(
    @InjectModel(Warranty.name) private warrantyModel: Model<Warranty>,
    private readonly productService: ProductService
  ) { }

  async create(body: createWarranty): Promise<Warranty> {
    const product = await this.productService.findById(body.productId);

    if (!product) throw new NotFoundException(`Product with id: ${body.productId} not found!`);

    const res = await this.warrantyModel.create(body);
    return res;
  }

  async claimedWarranty(data: claimedWarranty, id: string): Promise<Warranty>{
    const res = await this.warrantyModel.findByIdAndUpdate(id, {claim: data.claim});
    return res;
  }

  async listWarrantys(): Promise<Warranty[]>{
    const res = await this.warrantyModel.find().sort({ createdAt: -1});
    return res;
  }
}
