import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreRequestDto } from './dto/create-store.request.dto';
import { PatchStoreRequestDto } from './dto/patch-store.request.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  async findById(id: number): Promise<Store> {
    const store = await this.storesRepository.findOne(id);

    if (!store) {
      throw new NotFoundException(`Store: ${id}`);
    }

    return store;
  }

  async findByStoreName(storeName: string): Promise<Store> {
    const store = await this.storesRepository.findOne({ name: storeName });

    if (!store) {
      throw new NotFoundException(`Store: name=${storeName}`);
    }

    return store;
  }

  create({
    name,
    url,
    productNameSelector,
    productPriceSelector,
  }: CreateStoreRequestDto): Promise<Store> {
    const store = new Store();

    store.name = name;
    store.url = url;
    store.productNameSelector = productNameSelector;
    store.productPriceSelector = productPriceSelector;

    return this.storesRepository.save(store);
  }

  async patch(id: number, storeDto: PatchStoreRequestDto): Promise<Store> {
    const store = await this.findById(id);

    if (storeDto.name !== undefined) {
      store.name = storeDto.name;
    }
    if (storeDto.url !== undefined) {
      store.url = storeDto.url;
    }
    if (storeDto.productPriceSelector !== undefined) {
      store.productPriceSelector = storeDto.productPriceSelector;
    }
    if (storeDto.productNameSelector !== undefined) {
      store.productNameSelector = storeDto.productNameSelector;
    }

    return this.storesRepository.save(store);
  }

  async deleteById(id: number): Promise<void> {
    await this.storesRepository.delete(id);
  }
}
