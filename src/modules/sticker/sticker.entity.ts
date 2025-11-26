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
import { User } from '../user/user.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { StickerType } from '../sticker-type/sticker-type.entity';

@Entity('sticker')
export class Sticker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'sticker_type_id' })
  stickerTypeId: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ name: 'highlighted_text', nullable: true })
  highlightedText?: string;

  @Column({ nullable: true })
  promo?: string;

  @Column({ name: 'qr_code_link', nullable: true })
  qrCodeLink?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ name: 'sticker_form' })
  stickerForm: string;

  @Column({ name: 'highlighted_bg_color', nullable: true })
  highlightedBgColor?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.stickers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.sticker)
  orderItems: OrderItem[];

  @ManyToOne(() => StickerType, (type) => type.stickers, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'sticker_type_id' })
  stickerType: StickerType;
}
