import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class createWarranty {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string
}

export class claimedWarranty {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  claim: boolean
}
