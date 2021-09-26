import { Controller, Get } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<StoreDto[]> {
    const stores = await this.storesService.findAll();
    return stores.map((store) => new StoreDto(store));
  }
}
