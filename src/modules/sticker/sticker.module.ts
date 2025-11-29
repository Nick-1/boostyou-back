import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sticker } from './sticker.entity';
import { StickerController } from './sticker.controller';
import { StickerService } from './sticker.service';
import { StickerType } from '../sticker-type/sticker-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sticker, StickerType])],
  controllers: [StickerController],
  providers: [StickerService],
  exports: [StickerService],
})
export class StickerModule {}
