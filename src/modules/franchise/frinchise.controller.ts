import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';

@ApiTags('franchises')
@Controller('api/v1/franchises')
export class FranchiseController {
  constructor(private readonly franchiseService: FranchiseService) {}

  @Get()
  public findAll() {
    return this.franchiseService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string) {
    return this.franchiseService.findById(id);
  }

  @Post()
  public create(@Body() body: CreateFranchiseDto) {
    return this.franchiseService.create(body);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: UpdateFranchiseDto) {
    return this.franchiseService.update(id, body);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.franchiseService.remove(id);
  }
}
