import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
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

  create({
    name,
    url,
    priceClassName,
    priceId,
    productNameId,
    productNameClassName,
  }: CreateStoreRequestDto): Promise<Store> {
    const store = new Store();

    store.name = name;
    store.url = url;
    store.priceClassName = priceClassName;
    store.priceId = priceId;
    store.productNameClassName = productNameClassName;
    store.productNameId = productNameId;

    return this.storesRepository.save(store);
  }

  async patch(id: number, storeDto: PatchStoreRequestDto): Promise<Store> {
    const store = await this.findById(id);

    if (isDefined(store.name)) {
      store.name = storeDto.name;
    }
    if (isDefined(store.url)) {
      store.url = storeDto.url;
    }
    if (storeDto.priceClassName !== undefined) {
      store.priceClassName = storeDto.priceClassName;
    }
    if (storeDto.priceId !== undefined) {
      store.priceId = storeDto.priceId;
    }
    if (storeDto.productNameClassName !== undefined) {
      store.productNameClassName = storeDto.productNameClassName;
    }
    if (storeDto.productNameId !== undefined) {
      store.productNameId = storeDto.productNameId;
    }

    return this.storesRepository.save(store);
  }

  async delete(id: number): Promise<void> {
    await this.storesRepository.delete(id);
  }
}
