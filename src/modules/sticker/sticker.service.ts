import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { StickerType } from '../sticker-type/sticker-type.entity';
import { EntityStatus } from '../../common/enums';

import { CreateStickerDto } from './dto/create-sticker.dto';
import { Sticker } from './sticker.entity';

@Injectable()
export class StickerService {
  constructor(
    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,

    @InjectRepository(StickerType)
    private readonly stickerTypeRepo: Repository<StickerType>,
  ) {}

  public async create(dto: CreateStickerDto): Promise<Sticker> {
    const type = await this.stickerTypeRepo.findOne({
      where: { id: dto.stickerTypeId },
    });

    if (!type) {
      throw new NotFoundException(`StickerType ${dto.stickerTypeId} not found`);
    }

    if (type.status !== EntityStatus.ACTIVE) {
      throw new NotFoundException(`StickerType ${type.id} is not active`);
    }

    const sticker = this.stickerRepo.create({
      userId: dto.userId,
      stickerTypeId: dto.stickerTypeId,
      name: dto.name,
      title: dto.title,
      highlightedText: dto.highlightedText,
      highlightedBgColor: dto.highlightedBgColor,
      promo: dto.promo,
      qrCodeLink: dto.qrCodeLink,
      phone: dto.phone,
      address: dto.address,
      stickerForm: dto.stickerForm,
    });

    return this.stickerRepo.save(sticker);
  }

  public async findById(id: string): Promise<Sticker> {
    const sticker = await this.stickerRepo.findOne({
      where: { id },
      relations: { stickerType: true, user: true },
    });

    if (!sticker) {
      throw new NotFoundException(`Sticker ${id} not found`);
    }

    return sticker;
  }

  public async findByUser(userId: string): Promise<Sticker[]> {
    return this.stickerRepo.find({
      where: { userId },
      relations: { stickerType: true },
      order: { createdAt: 'DESC' },
    });
  }

  public async findByType(typeId: string): Promise<Sticker[]> {
    return this.stickerRepo.find({
      where: { stickerTypeId: typeId },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  public async findByIdList(ids: string[]): Promise<Sticker[]> {
    const stickers = await this.stickerRepo.find({
      where: { id: In(ids) },
      relations: { stickerType: true },
    });

    if (stickers.length !== ids.length) {
      throw new NotFoundException('Some stickers do not exist');
    }

    return stickers;
  }
}
