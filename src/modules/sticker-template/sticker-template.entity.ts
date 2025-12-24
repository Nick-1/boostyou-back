import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Sticker } from '../sticker/sticker.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { Currency, EntityStatus } from '../../common/enums';
import { SponsorCampaign } from '../sponsor-compaing/sponsor-campaign.entity';

@Check(`"price" >= 0`)
@Check(`("is_sponsored" = false) OR ("sponsor_campaign_id" IS NOT NULL)`)
@Entity('sticker_template')
export class StickerTemplate {
  @PrimaryColumn({ name: 'key', type: 'varchar', length: 128 })
  declare public key: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  declare public price: string;

  @Index()
  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
  declare public status: EntityStatus;

  @Column({ type: 'char', length: 3, default: Currency.USD })
  declare public currency: Currency;

  @Index()
  @Column({ name: 'is_sponsored', type: 'boolean', default: false })
  declare public isSponsored: boolean;

  @Index()
  @Column({ name: 'sponsor_campaign_id', type: 'uuid', nullable: true })
  declare public sponsorCampaignId?: string | null;

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

  @ManyToOne(() => SponsorCampaign, (c) => c.templates, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sponsor_campaign_id' })
  declare public sponsorCampaign?: SponsorCampaign | null;

  @OneToMany(() => Sticker, (s) => s.template)
  declare public stickers: Sticker[];

  @OneToMany(() => OrderItem, (oi) => oi.template)
  declare public orderItems: OrderItem[];
}
