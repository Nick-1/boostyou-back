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
import { Customer } from '../customer/customer.entity';
import { StickerTemplate } from '../sticker-template/sticker-template.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { EntityStatus } from '../../common/enums';

@Entity('sticker')
export class Sticker {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Index()
  @Column({ name: 'customer_id', type: 'uuid' })
  declare public customerId: string;

  @Column({ type: 'varchar', length: 255 })
  declare public name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  declare public title?: string | null;

  @Column({
    name: 'highlighted_text',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  declare public highlightedText?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  declare public discount?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  declare public promo?: string | null;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  declare public logoUrl?: string | null;

  @Column({ name: 'qr_url', type: 'text', nullable: true })
  declare public qrUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  declare public address?: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  declare public phone?: string | null;

  @Index()
  @Column({ name: 'template_key', type: 'varchar', length: 128 })
  declare public templateKey: string;

  @Column({ default: EntityStatus.ACTIVE, enum: EntityStatus })
  status: EntityStatus;

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

  @ManyToOne(() => Customer, (c) => c.stickers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  declare public customer: Customer;

  @ManyToOne(() => StickerTemplate, (t) => t.stickers, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'template_key', referencedColumnName: 'key' })
  declare public template: StickerTemplate;

  @OneToMany(() => OrderItem, (oi) => oi.sticker)
  declare public orderItems: OrderItem[];
}
