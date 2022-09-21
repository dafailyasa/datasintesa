import { IsEmail, IsEnum,IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../user/user.model';

export class SignDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class signupDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role, {message: `Role should be enum valid value. (${Object.values(Role)})`})
  role: Role;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {message:'Too short, minimum length is 8 character'})
  password: string;
}
