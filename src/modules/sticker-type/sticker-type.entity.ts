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

@Entity('sticker_type')
export class StickerType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'redactor_bg_url' })
  redactorBgUrl: string;

  @Column({ name: 'original_bg_url', nullable: true })
  originalImageUrl?: string;

  @Column({ name: 'bg_color', nullable: true })
  bgColor?: string;

  @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2 })
  price: string;

  @Column({ name: 'sponsor_id', nullable: true })
  sponsorId?: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'sponsor_id' })
  sponsor?: User | null;

  @Column({ type: 'int', nullable: true })
  limit?: number | null;

  @Column({ name: 'used', type: 'int', default: 0 })
  used: number;

  @OneToMany(() => Sticker, (sticker) => sticker.stickerType)
  stickers: Sticker[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
