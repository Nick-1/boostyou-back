import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreatePlaceDto {
  @IsOptional()
  @IsString()
  franchiseId?: string | null;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  state: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
