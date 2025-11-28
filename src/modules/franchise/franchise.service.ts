import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Franchise } from './franchise.entity';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

@Injectable()
export class FranchiseService {
  constructor(
    @InjectRepository(Franchise)
    private readonly franchiseRepo: Repository<Franchise>,
  ) {}

  public async findAll(): Promise<Franchise[]> {
    return this.franchiseRepo.find({
      relations: { places: true },
    });
  }

  public async findById(id: string): Promise<Franchise> {
    const franchise = await this.franchiseRepo.findOne({
      where: { id },
      relations: { places: true },
    });

    if (!franchise) {
      throw new NotFoundException(`Franchise with id ${id} not found`);
    }

    return franchise;
  }

  public async create(dto: CreateFranchiseDto): Promise<Franchise> {
    const entity = this.franchiseRepo.create({
      name: dto.name,
      logoUrl: dto.logoUrl,
    });

    return this.franchiseRepo.save(entity);
  }

  public async update(id: string, dto: UpdateFranchiseDto): Promise<Franchise> {
    const franchise = await this.franchiseRepo.findOne({ where: { id } });

    if (!franchise) {
      throw new NotFoundException(`Franchise with id ${id} not found`);
    }

    if (dto.name !== undefined) {
      franchise.name = dto.name;
    }

    if (dto.logoUrl !== undefined) {
      franchise.logoUrl = dto.logoUrl;
    }

    return this.franchiseRepo.save(franchise);
  }

  public async remove(id: string): Promise<void> {
    const res = await this.franchiseRepo.delete(id);

    if (!res.affected) {
      throw new NotFoundException(`Franchise with id ${id} not found`);
    }
  }
}
