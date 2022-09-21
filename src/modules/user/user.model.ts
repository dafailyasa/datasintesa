import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  Customer = 'customer',
  Staff = 'staff',
}

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'users',
})
export class User {
  @Prop({ type: 'string', required: true })
  firstName: string;

  @Prop({ type: 'string', required: true })
  lastName: string;

  @Prop({ type: 'string', required: true, unique: true })
  email: string;

  @Prop({ type: 'string', required: true, enum: Object.values(Role), default: Role.Customer})
  role: Role;

  @Prop({ type: Boolean, default: true})
  status: boolean;

  @Prop({ type: 'string', required: true,})
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
