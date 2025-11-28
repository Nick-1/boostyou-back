import { IsOptional, IsString } from 'class-validator';
import { Location } from '../../../common/types';

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

  location: Location;
}
