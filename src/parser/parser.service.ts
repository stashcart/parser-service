import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { StoresService } from 'src/stores/stores.service';
import { ParseProductResponseDto } from './dto/parse-product.response.dto';

@Injectable()
export class ParserService {
  constructor(
    private readonly storesService: StoresService,
    private readonly httpService: HttpService,
  ) {}

  async parseProductByUrlAndStoreName(
    url: string,
    storeName: string,
  ): Promise<ParseProductResponseDto> {
    const store = await this.storesService.findByStoreName(storeName);

    if (!url.includes(store.url)) {
      throw new BadRequestException(
        `Store url "${store.url}" doesn't match with specified product "${url}"`,
      );
    }

    const response = new ParseProductResponseDto();

    response.url = url;
    response.storeName = storeName;

    if (!store.productNameSelector && !store.productPriceSelector) {
      return response;
    }

    const { data: html } = await firstValueFrom(
      this.httpService.get<string>(url, { headers: { Accept: 'text/html' } }),
    );
    const $ = cheerio.load(html);

    if (store.productPriceSelector) {
      const price = $(store.productPriceSelector).first().text();
      response.price = this.parsePrice(price);
    }
    if (store.productNameSelector) {
      response.name = $(store.productNameSelector).first().text();
    }

    return response;
  }

  private parsePrice(price: string): number {
    return parseFloat(price.replace(/,/g, '.').replace(/[^0-9.]/g, ''));
  }
}
