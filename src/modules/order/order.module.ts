import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '../order-item/order-item.entity';
import { Place } from '../place/place.entity';
import { Sticker } from '../sticker/sticker.entity';
import { OrderItemService } from '../order-item/order-item.service';

import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { StickerService } from '../sticker/sticker.service';
import { StickerType } from '../sticker-type/sticker-type.entity';
import { PlaceService } from '../place/place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Place, Sticker, StickerType]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderItemService,
    StickerService,
    PlaceService,
  ],
  exports: [OrderService, OrderRepository, StickerService, PlaceService],
})
export class OrderModule {}
