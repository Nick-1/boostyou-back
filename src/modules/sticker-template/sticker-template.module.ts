import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StickerTemplate } from './sticker-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StickerTemplate])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StickerTemplateModule {}
