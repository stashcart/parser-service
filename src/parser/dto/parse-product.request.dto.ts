import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ParseProductRequestDto {
  @ApiProperty({
    example:
      'https://ua.iherb.com/pr/jarrow-formulas-msm-1-000-mg-200-veggie-caps/244',
  })
  @IsUrl()
  url!: string;

  @ApiProperty({ example: 'iherb' })
  @IsString()
  storeName!: string;
}
