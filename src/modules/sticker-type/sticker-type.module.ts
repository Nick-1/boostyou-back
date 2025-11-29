import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StickerType } from './sticker-type.entity';
import { StickerTypeController } from './sticker-type.controller';
import { StickerTypeService } from './sticker-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([StickerType])],
  controllers: [StickerTypeController],
  providers: [StickerTypeService],
  exports: [StickerTypeService],
})
export class StickerTypeModule {}
