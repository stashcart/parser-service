import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  url!: string;

  @Column({ name: 'price_id', nullable: true })
  priceId?: string;

  @Column({ name: 'price_class_name', nullable: true })
  priceClassName?: string;

  @Column({ name: 'product_name_id', nullable: true })
  productNameId?: string;

  @Column({ name: 'product_name_class_name', nullable: true })
  productNameClassName?: string;
}
