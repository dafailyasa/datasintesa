import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Warranty & Document;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'warrantys',
})
export class Warranty {
  @Prop({ type: 'string', required: true })
  title: string;


  @Prop({ type: 'string', required: true })
  description: string;

  @Prop({ type: 'string', required: true, default: false })
  claim: boolean;

  @Prop({ type: 'string', required: true })
  productId: string;
}

export const warrantySchema = SchemaFactory.createForClass(Warranty);
