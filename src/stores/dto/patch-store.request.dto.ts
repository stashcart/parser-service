import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class PatchStoreRequestDto {
  @ApiProperty({ example: 'iherb' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'https://ua.iherb.com' })
  @IsUrl()
  @IsOptional()
  url?: string;

  @ApiProperty({ example: '#price' })
  @IsString()
  @IsOptional()
  productPriceSelector?: string;

  @ApiProperty({ example: '#name' })
  @IsString()
  @IsOptional()
  productNameSelector?: string;
}
