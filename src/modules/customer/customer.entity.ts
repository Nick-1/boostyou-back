import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Sticker } from '../sticker/sticker.entity';
import { Order } from '../order/order.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Index({ unique: true })
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  declare public userId?: string | null;

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

  @OneToOne(() => User, (u) => u.customer, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  declare public user?: User | null;

  @OneToMany(() => Sticker, (s) => s.customer)
  declare public stickers: Sticker[];

  @OneToMany(() => Order, (o) => o.customer)
  declare public orders: Order[];
}
