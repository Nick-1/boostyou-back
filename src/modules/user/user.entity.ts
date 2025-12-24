import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRole, UserStatus } from './enums';
import { Customer } from '../customer/customer.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  declare public login: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  declare public passwordHash: string;

  @Index()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  declare public role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    enumName: 'user_status_enum',
    default: UserStatus.NOT_VERIFIED,
  })
  declare status: UserStatus;

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

  @OneToOne(() => Customer, (c) => c.user)
  declare public customer?: Customer;
}
