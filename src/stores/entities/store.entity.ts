import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  url!: string;

  @Column({ name: 'product_price_selector', nullable: true })
  productPriceSelector?: string;

  @Column({ name: 'product_name_selector', nullable: true })
  productNameSelector?: string;
}
