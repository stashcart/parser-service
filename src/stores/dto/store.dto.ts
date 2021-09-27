import { Store } from '../entities/store.entity';

export class StoreDto {
  id: number;

  name: string;

  url: string;

  priceId: string | null;

  priceClassName: string | null;

  productNameId: string | null;

  productNameClassName: string | null;

  constructor(store: Store) {
    this.id = store.id;
    this.name = store.name;
    this.url = store.url;
    this.priceId = store.priceId ?? null;
    this.priceClassName = store.priceClassName ?? null;
    this.productNameId = store.productNameId ?? null;
    this.productNameClassName = store.productNameClassName ?? null;
  }
}
