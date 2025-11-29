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
import { Sticker } from '../sticker/sticker.entity';
import { EntityStatus } from '../../common/enums';

@Entity('sticker_type')
export class StickerType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: EntityStatus.ACTIVE, enum: EntityStatus })
  status: EntityStatus;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'redactor_bg_url' })
  redactorBgUrl: string;

  @Column({ name: 'original_bg_url', nullable: true })
  originalImageUrl?: string;

  @Column({ name: 'bg_color', nullable: true })
  bgColor?: string;

  @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'sponsor_id', nullable: true })
  sponsorId?: string | null;

  @Column({ type: 'int', nullable: true })
  limit?: number | null;

  @Column({ name: 'used', type: 'int', default: 0 })
  used: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sponsor_id' })
  sponsor?: User | null;

  @OneToMany(() => Sticker, (sticker) => sticker.stickerType)
  stickers: Sticker[];
}
