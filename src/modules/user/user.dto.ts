import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class updatePasswordDTO{
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string
}

export class updateStatus{
  @IsNotEmpty()
  @IsBoolean()
  password: boolean
}