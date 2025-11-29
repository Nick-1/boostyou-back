import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStickerDto {
  @ApiProperty({ example: '97d13e4a-b80d-4c61-9bc6-5c6fde57f4b1' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'f9f8c902-3d0a-4d41-9fe8-4dfe4f1e2e00' })
  @IsUUID()
  stickerTypeId: string;

  @ApiProperty({ example: 'NY 2025 Promo #1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Some title from user or company name' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Some super important text with color background!',
  })
  @IsString()
  @IsOptional()
  highlightedText?: string;

  @ApiPropertyOptional({ example: '#FFF9C4' })
  @IsString()
  @IsOptional()
  highlightedBgColor?: string;

  @ApiPropertyOptional({ example: 'PROMO2025' })
  @IsString()
  @IsOptional()
  promo?: string;

  @ApiPropertyOptional({
    example: 'https://boostyou.us/landing/ny-2025',
  })
  @IsString()
  @IsOptional()
  qrCodeLink?: string;

  @ApiPropertyOptional({ example: '+1 (555) 123-4567' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: '5th Avenue, 10' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'rectangle',
    description: 'Sticker form: rectangle | circle | cup-wrap | ...',
  })
  @IsString()
  @IsNotEmpty()
  stickerForm: string;
}
