import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './enums';
import { Customer } from '../customer/customer.entity';
import { OrderItem } from '../order-item/order-item.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Index()
  @Column({ name: 'customer_id', type: 'uuid' })
  declare public customerId: string;

  @ManyToOne(() => Customer, (c) => c.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  declare public customer: Customer;

  @Index()
  @Column({ type: 'varchar', enum: OrderStatus })
  declare public status: OrderStatus;

  @Column({ name: 'total_price', type: 'numeric', precision: 10, scale: 2 })
  declare public totalPrice: string;

  @Column({ type: 'char', length: 3, default: 'USD' })
  declare public currency: string;

  @OneToMany(() => OrderItem, (oi) => oi.order, { cascade: true })
  declare public items: OrderItem[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  declare public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  declare public updatedAt: Date;
}
