import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Place } from '../place/place.entity';
import { EntityStatus } from '../../common/enums';

@Entity('franchise')
export class Franchise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: EntityStatus.ACTIVE, enum: EntityStatus })
  status: EntityStatus;

  @Column({ nullable: true })
  logoUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Place, (place) => place.franchise)
  places: Place[];
}
