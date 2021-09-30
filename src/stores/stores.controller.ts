import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStoreRequestDto } from './dto/create-store.request.dto';
import { PatchStoreRequestDto } from './dto/patch-store.request.dto';
import { StoreDto } from './dto/store.dto';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<StoreDto[]> {
    const stores = await this.storesService.findAll();
    return stores.map((store) => new StoreDto(store));
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<StoreDto> {
    const store = await this.storesService.findById(id);
    return new StoreDto(store);
  }

  @Post()
  async create(
    @Body() createStoreDto: CreateStoreRequestDto,
  ): Promise<StoreDto> {
    const store = await this.storesService.create(createStoreDto);
    return new StoreDto(store);
  }

  @Delete(':id')
  delete(@Param(':id') id: number): Promise<void> {
    return this.storesService.deleteById(id);
  }

  @Patch(':id')
  async patch(
    @Param(':id') id: number,
    @Body() patchStoreDto: PatchStoreRequestDto,
  ): Promise<StoreDto> {
    const store = await this.storesService.patch(id, patchStoreDto);
    return new StoreDto(store);
  }
}
