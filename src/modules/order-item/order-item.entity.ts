import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Place } from '../place/place.entity';
import { Sticker } from '../sticker/sticker.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'sticker_id' })
  stickerId: string;

  @Column({ name: 'place_id' })
  placeId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  itemPrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Sticker, (sticker) => sticker.orderItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'sticker_id' })
  sticker: Sticker;

  @ManyToOne(() => Place, (place) => place.orderItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'place_id' })
  place: Place;
}
