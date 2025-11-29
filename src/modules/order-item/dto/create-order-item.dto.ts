import { IsInt, IsUUID, Min } from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  stickerId: string;

  @IsUUID()
  placeId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
