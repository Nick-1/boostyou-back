import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { StickerTypeService } from './sticker-type.service';
import { StickerType } from './sticker-type.entity';
import { CreateStickerTypeDto } from './dto/create-sticker-type.dto';
import { UpdateStickerTypeStatusDto } from './dto/update-sticker-type-status.dto';
import { UpdateStickerTypeDto } from './dto/update-sticker-type.dto';

@ApiTags('Sticker Types')
@Controller('/api/v1/sticker-types')
export class StickerTypeController {
  constructor(private readonly stickerTypeService: StickerTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: StickerType })
  async create(@Body() dto: CreateStickerTypeDto): Promise<StickerType> {
    return this.stickerTypeService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [StickerType] })
  async findAll(): Promise<StickerType[]> {
    return this.stickerTypeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: StickerType })
  async findById(@Param('id') id: string): Promise<StickerType> {
    return this.stickerTypeService.findById(id);
  }

  @Get('/sponsor/:sponsorId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: [StickerType] })
  async findBySponsor(
    @Param('sponsorId') sponsorId: string,
  ): Promise<StickerType[]> {
    return this.stickerTypeService.findBySponsor(sponsorId);
  }

  @Patch('/:id/update')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: StickerType })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStickerTypeDto,
  ): Promise<StickerType> {
    return this.stickerTypeService.update(id, dto);
  }

  @Patch('/:id/status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: StickerType })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStickerTypeStatusDto,
  ): Promise<StickerType> {
    return this.stickerTypeService.updateStatus(id, dto);
  }
}
