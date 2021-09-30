import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseProductRequestDto } from './dto/parse-product.request.dto';
import { ParseProductResponseDto } from './dto/parse-product.response.dto';
import { ParserService } from './parser.service';

@ApiTags('Parser')
@Controller('parse')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('product')
  parseProduct(
    @Query() { url, storeName }: ParseProductRequestDto,
  ): Promise<ParseProductResponseDto> {
    return this.parserService.parseProductByUrlAndStoreName(url, storeName);
  }
}
