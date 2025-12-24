import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorCampaign } from './sponsor-campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SponsorCampaign])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SponsorCampaignModule {}
