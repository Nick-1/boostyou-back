import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StickerType } from './sticker-type.entity';
import { CreateStickerTypeDto } from './dto/create-sticker-type.dto';
import { UpdateStickerTypeDto } from './dto/update-sticker-type.dto';
import { UpdateStickerTypeStatusDto } from './dto/update-sticker-type-status.dto';

@Injectable()
export class StickerTypeService {
  constructor(
    @InjectRepository(StickerType)
    private readonly stickerTypeRepo: Repository<StickerType>,
  ) {}

  public async create(dto: CreateStickerTypeDto): Promise<StickerType> {
    const type = this.stickerTypeRepo.create({
      name: dto.name,
      description: dto.description,
      redactorBgUrl: dto.redactorBgUrl,
      originalImageUrl: dto.originalImageUrl,
      bgColor: dto.bgColor,
      price: dto.price,
      sponsorId: dto.sponsorId ?? null,
      limit: dto.limit ?? null,
    });

    return this.stickerTypeRepo.save(type);
  }

  public async findAll(): Promise<StickerType[]> {
    return this.stickerTypeRepo.find({
      relations: { sponsor: true },
      order: { createdAt: 'DESC' },
    });
  }

  public async findById(id: string): Promise<StickerType> {
    const type = await this.stickerTypeRepo.findOne({
      where: { id },
      relations: { sponsor: true, stickers: true },
    });

    if (!type) throw new NotFoundException(`StickerType ${id} not found`);

    return type;
  }

  public async findBySponsor(sponsorId: string): Promise<StickerType[]> {
    return this.stickerTypeRepo.find({
      where: { sponsorId },
      relations: { sponsor: true },
      order: { createdAt: 'DESC' },
    });
  }

  public async update(
    id: string,
    dto: UpdateStickerTypeDto,
  ): Promise<StickerType> {
    const type = await this.stickerTypeRepo.findOne({ where: { id } });

    if (!type) {
      throw new NotFoundException(`StickerType ${id} not found`);
    }

    if (dto.name !== undefined) {
      type.name = dto.name;
    }
    if (dto.description !== undefined) {
      type.description = dto.description;
    }
    if (dto.redactorBgUrl !== undefined) {
      type.redactorBgUrl = dto.redactorBgUrl;
    }
    if (dto.originalImageUrl !== undefined) {
      type.originalImageUrl = dto.originalImageUrl;
    }
    if (dto.bgColor !== undefined) {
      type.bgColor = dto.bgColor;
    }
    if (dto.price !== undefined) {
      type.price = dto.price;
    }
    if (dto.sponsorId !== undefined) {
      type.sponsorId = dto.sponsorId;
    }
    if (dto.limit !== undefined) {
      type.limit = dto.limit;
    }

    return this.stickerTypeRepo.save(type);
  }

  public async updateStatus(
    id: string,
    dto: UpdateStickerTypeStatusDto,
  ): Promise<StickerType> {
    const type = await this.stickerTypeRepo.findOne({ where: { id } });

    if (!type) {
      throw new NotFoundException(`StickerType ${id} not found`);
    }

    type.status = dto.status;

    return this.stickerTypeRepo.save(type);
  }
}
