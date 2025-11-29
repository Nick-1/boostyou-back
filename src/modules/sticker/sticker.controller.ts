import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { StickerService } from './sticker.service';
import { Sticker } from './sticker.entity';
import { CreateStickerDto } from './dto/create-sticker.dto';

@ApiTags('Stickers')
@Controller('/api/v1/stickers')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Sticker })
  async create(@Body() dto: CreateStickerDto): Promise<Sticker> {
    return this.stickerService.create(dto);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: Sticker })
  async findById(@Param('id') id: string): Promise<Sticker> {
    return this.stickerService.findById(id);
  }

  @Get('/user/:userId')
  @ApiResponse({ status: 200, type: [Sticker] })
  async findByUser(@Param('userId') userId: string): Promise<Sticker[]> {
    return this.stickerService.findByUser(userId);
  }

  @Get('/type/:typeId')
  @ApiResponse({ status: 200, type: [Sticker] })
  async findByType(@Param('typeId') typeId: string): Promise<Sticker[]> {
    return this.stickerService.findByType(typeId);
  }
}
