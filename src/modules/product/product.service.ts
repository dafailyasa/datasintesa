import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createProduct, updateProduct } from './product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ){}

  async create(body: createProduct): Promise<Product> {
    const res = await this.ProductModel.create(body);

    return res;
  }

  async findById(id:string): Promise<Product> {
    const product = await this.ProductModel.findOne({_id: id});
    return product;
  }

  async list(): Promise<Product[]>{
    const product = await this.ProductModel.find();

    return product;
  }

  async detail(id: string): Promise<Product>{
    const product = await this.ProductModel.findById(id);

    return product;
  }

  async update(id: string, body: updateProduct): Promise<Product>{
    const product = await this.ProductModel.findByIdAndUpdate(id, body);

    return product;
  }

  async delete(id: string){
    const product = await this.ProductModel.findByIdAndDelete(id);

    return product;
  }
}
