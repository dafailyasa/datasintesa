import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class createWarranty{
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  productId: string
}

export class claimedWarranty{
  @IsNotEmpty()
  @IsBoolean()
  claim: boolean
}
