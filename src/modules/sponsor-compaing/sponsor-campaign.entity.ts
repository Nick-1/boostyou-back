import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityStatus } from '../../common/enums';
import { StickerTemplate } from '../sticker-template/sticker-template.entity';

@Entity('sponsor_campaign')
export class SponsorCampaign {
  @PrimaryGeneratedColumn('uuid')
  declare public id: string;

  @Column({ type: 'varchar', length: 255 })
  declare public name: string;

  @Index()
  @Column({ name: 'starts_at', type: 'timestamp' })
  declare public startsAt: Date;

  @Index()
  @Column({ name: 'ends_at', type: 'timestamp', nullable: true })
  declare public endsAt?: Date | null;

  @Column({ type: 'int' })
  declare public limit: number;

  @Column({ type: 'int', default: 0 })
  declare public used: number;

  @Index()
  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.ACTIVE,
  })
  declare public status: EntityStatus;

  @Column({
    name: 'supported_by_label',
    type: 'varchar',
    length: 120,
    default: 'supported_by',
  })
  declare public supportedByLabel: string;

  @Column({ name: 'sponsor_logo_url', type: 'text' })
  declare public sponsorLogoUrl: string;

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

  @OneToMany(() => StickerTemplate, (t) => t.sponsorCampaign)
  declare public templates: StickerTemplate[];
}
