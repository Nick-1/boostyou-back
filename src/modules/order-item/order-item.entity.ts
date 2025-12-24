import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { Sticker } from '../sticker/sticker.entity';
import { StickerTemplate } from '../sticker-template/sticker-template.entity';
import { Place } from '../place/place.entity';

@Check(`"quantity" > 0`)
@Check(`"unit_price" >= 0`)
@Check(`"total_price" >= 0`)
@Check(`"total_price" = "unit_price" * "quantity"`)
@Unique('UQ_order_item_order_sticker_place', [
  'orderId',
  'stickerId',
  'placeId',
])
@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Index()
  @Column({ name: 'order_id', type: 'uuid' })
  declare public orderId: string;

  @ManyToOne(() => Order, (o) => o.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  declare public order: Order;

  @Index()
  @Column({ name: 'sticker_id', type: 'uuid' })
  declare public stickerId: string;

  @ManyToOne(() => Sticker, (s) => s.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'sticker_id' })
  declare public sticker: Sticker;

  @Index()
  @Column({ name: 'place_id', type: 'uuid' })
  declare public placeId: string;

  @ManyToOne(() => Place, (p) => p.orderItems, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'place_id' })
  declare public place: Place;

  @Index()
  @Column({
    name: 'template_key',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  declare public templateKey: string;

  @Column({ type: 'int' })
  declare public quantity: number;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  declare public unitPrice: string;

  @Column({ name: 'total_price', type: 'numeric', precision: 10, scale: 2 })
  declare public totalPrice: string;

  @Column({ name: 'design_snapshot', type: 'jsonb', nullable: false })
  declare public designSnapshot: Record<string, unknown>;

  @Index()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
  })
  declare public createdAt: Date;

  @ManyToOne(() => StickerTemplate, (t) => t.orderItems, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'template_key', referencedColumnName: 'key' })
  declare public template: StickerTemplate;
}
