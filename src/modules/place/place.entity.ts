import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Franchise } from '../franchise/franchise.entity';
import { Location } from '../../common/types';
import { OrderItem } from '../order-item/order-item.entity';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'franchise_id', nullable: true })
  franchiseId?: string | null;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column({ type: 'jsonb' })
  location: Location;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Franchise, (franchise) => franchise.places, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'franchise_id' })
  franchise?: Franchise;

  @OneToMany(() => OrderItem, (item) => item.place)
  orderItems: OrderItem[];
}
