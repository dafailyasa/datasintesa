import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class updatePasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string
}

export class updateStatus {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean
}