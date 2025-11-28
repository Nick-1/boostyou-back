import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StickerType } from './sticker-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StickerType])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StickerTypeModule {}
