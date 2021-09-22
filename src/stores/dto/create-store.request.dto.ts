import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateStoreRequestDto {
  @ApiProperty({ example: 'iherb' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://ua.iherb.com' })
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'price' })
  @IsString()
  @IsOptional()
  priceId?: string;

  @IsString()
  @IsOptional()
  priceClassName?: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsOptional()
  productNameId?: string;

  @IsString()
  @IsOptional()
  productNameClassName?: string;
}
