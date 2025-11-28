import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Franchise } from './franchise.entity';
import { FranchiseController } from './frinchise.controller';
import { FranchiseService } from './franchise.service';

@Module({
  imports: [TypeOrmModule.forFeature([Franchise])],
  controllers: [FranchiseController],
  providers: [FranchiseService],
  exports: [FranchiseService],
})
export class FranchiseModule {}
