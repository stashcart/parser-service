import { Store } from '../entities/store.entity';

export class StoreDto {
  id: number;

  name: string;

  url: string;

  productPriceSelector: string | null;

  productNameSelector: string | null;

  constructor(store: Store) {
    this.id = store.id;
    this.name = store.name;
    this.url = store.url;
    this.productPriceSelector = store.productPriceSelector ?? null;
    this.productNameSelector = store.productNameSelector ?? null;
  }
}
