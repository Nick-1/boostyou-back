import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { EntityStatus } from '../../../common/enums';

export class UpdateStickerTypeStatusDto {
  @ApiProperty({ example: 'active' })
  @IsString()
  @IsEnum(EntityStatus)
  status: EntityStatus;
}
