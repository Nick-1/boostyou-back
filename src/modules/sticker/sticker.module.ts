import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sticker } from './sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StickerModule {}
