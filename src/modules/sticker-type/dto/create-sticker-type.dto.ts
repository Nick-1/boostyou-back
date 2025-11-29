import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStickerTypeDto {
  @ApiProperty({ example: 'New Year Special' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'New Year Special design limited' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://cdn.boostyou.us/stickers/backgrounds/new-year-editor.png',
  })
  @IsString()
  @IsNotEmpty()
  redactorBgUrl: string;

  @ApiPropertyOptional({
    example:
      'https://cdn.boostyou.us/stickers/backgrounds/new-year-original.png',
  })
  @IsString()
  @IsOptional()
  originalImageUrl?: string;

  @ApiPropertyOptional({ example: '#FFFFFF' })
  @IsString()
  @IsOptional()
  bgColor?: string;

  @ApiProperty({ example: 0.5, description: 'Price for one sticker' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 'fd7b4b81-03a7-4f5a-a0c7-33b7e616b8b2',
    description: 'sponsorId = userId. This is user with role: Sponsor',
  })
  @IsUUID()
  @IsOptional()
  sponsorId?: string;

  @ApiPropertyOptional({
    example: 10000,
    description: 'Limit for sponsors sticker',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
}
