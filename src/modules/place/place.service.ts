import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Place } from './place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
  ) {}

  public async findAll(): Promise<Place[]> {
    return this.placeRepo.find({
      relations: { franchise: true },
    });
  }

  public async findById(id: string): Promise<Place> {
    const place = await this.placeRepo.findOne({
      where: { id },
      relations: { franchise: true },
    });

    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    return place;
  }

  public async create(dto: CreatePlaceDto): Promise<Place> {
    const entity = this.placeRepo.create({
      franchiseId: dto.franchiseId ?? null,
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      city: dto.city,
      country: dto.country,
      state: dto.state,
      location: dto.location,
    });

    return this.placeRepo.save(entity);
  }

  public async update(id: string, dto: UpdatePlaceDto): Promise<Place> {
    const place = await this.placeRepo.findOne({ where: { id } });

    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }

    if (dto.franchiseId !== undefined) {
      place.franchiseId = dto.franchiseId;
    }
    if (dto.name !== undefined) {
      place.name = dto.name;
    }
    if (dto.address !== undefined) {
      place.address = dto.address;
    }
    if (dto.phone !== undefined) {
      place.phone = dto.phone;
    }
    if (dto.city !== undefined) {
      place.city = dto.city;
    }
    if (dto.country !== undefined) {
      place.country = dto.country;
    }
    if (dto.state !== undefined) {
      place.state = dto.state;
    }
    if (dto.location !== undefined) {
      place.location = dto.location;
    }

    return this.placeRepo.save(place);
  }

  public async remove(id: string): Promise<void> {
    const res = await this.placeRepo.delete(id);

    if (!res.affected) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
  }

  public async findByFranchiseId(franchiseId: string): Promise<Place[]> {
    return this.placeRepo.find({
      where: { franchiseId },
      relations: { franchise: true },
    });
  }

  public async findByIdList(ids: string[]): Promise<Place[]> {
    const places = await this.placeRepo.find({
      where: { id: In(ids) },
    });

    if (places.length !== ids.length) {
      throw new NotFoundException('Some places do not exist');
    }

    return places;
  }
}
