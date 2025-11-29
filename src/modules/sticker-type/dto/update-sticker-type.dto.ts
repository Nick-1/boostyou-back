import { PartialType } from '@nestjs/mapped-types';

import { CreateStickerTypeDto } from './create-sticker-type.dto';

export class UpdateStickerTypeDto extends PartialType(CreateStickerTypeDto) {}
