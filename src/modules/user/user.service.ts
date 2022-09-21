import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { signupDTO } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }
  async create(user: signupDTO) {
    try {
      const salt = bcrypt.genSaltSync();
      const hashPassword = await bcrypt.hash(user.password, salt);

      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        password: hashPassword,
        salt: salt,
      }

      const result = await this.userModel.create(data);
      return result;
    } catch (error) {
      if (error.code == 11000) {
        throw new HttpException(
          `Email ${user.email} already registered. Please use another email!`,
          HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async users(status: string): Promise<User[]> {
    let users: User[];

    if (status != null || status?.trim() == '') {
      users = await this.userModel.find().sort({ createdAt: -1 });
    } else {
      users = await this.userModel.find({ status: status }).sort({ createdAt: -1 });
    }

    return users;
  }

  async updatePassword(password: string, userId: string): Promise<boolean> {
    const salt = bcrypt.genSaltSync();
    const hashPassword = await bcrypt.hash(password, salt);

    const res = await this.userModel.findByIdAndUpdate(userId, { password: hashPassword });

    return res ? true : false;
  }

  async updateStatus(status: boolean, id: string) {
    const res = await this.userModel.findByIdAndUpdate(id, { status: status });

    return res;
  }
}
