import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sticker } from '../sticker/sticker.entity';
import { Order } from '../order/order.entity';
import { UserRole } from '../../common/enums';
import { StickerType } from '../sticker-type/sticker-type.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column()
  status: string;

  @Column()
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Sticker, (sticker) => sticker.user)
  stickers: Sticker[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => StickerType, (type) => type.sponsor)
  sponsoredStickerTypes: StickerType[];
}
