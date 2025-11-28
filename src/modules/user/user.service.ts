import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.toResponse(user);
  }

  public async findByLogin(login: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { login } });
  }

  public async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.findByLogin(dto.login);

    if (existing) {
      throw new ConflictException('User with this login already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = this.userRepo.create({
      login: dto.login,
      password: passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
    });

    const saved = await this.userRepo.save(user);

    return this.toResponse(saved);
  }

  public async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.login && dto.login !== user.login) {
      const existing = await this.findByLogin(dto.login);
      if (existing && existing.id !== id) {
        throw new ConflictException('User with this login already exists');
      }
      user.login = dto.login;
    }

    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(dto.password, salt);
    }

    if (dto.firstName !== undefined) {
      user.firstName = dto.firstName;
    }

    if (dto.lastName !== undefined) {
      user.lastName = dto.lastName;
    }

    if (dto.role !== undefined) {
      user.role = dto.role;
    }

    const saved = await this.userRepo.save(user);
    return this.toResponse(saved);
  }

  public async remove(id: string): Promise<void> {
    const res = await this.userRepo.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  private toResponse(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return rest;
  }
}
