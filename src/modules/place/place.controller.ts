import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@ApiTags('places')
@Controller('api/v1/places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get()
  public findByFranchiseId(@Query('franchiseId') franchiseId?: string) {
    if (franchiseId) {
      return this.placeService.findByFranchiseId(franchiseId);
    }
    return this.placeService.findAll();
  }

  @Get(':id')
  public findById(@Param('id') id: string) {
    return this.placeService.findById(id);
  }

  @Post()
  public create(@Body() body: CreatePlaceDto) {
    return this.placeService.create(body);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: UpdatePlaceDto) {
    return this.placeService.update(id, body);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.placeService.remove(id);
  }
}
