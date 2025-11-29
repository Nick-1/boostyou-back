import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '../order-item/order-item.entity';
import { Place } from '../place/place.entity';
import { Sticker } from '../sticker/sticker.entity';

import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemService } from '../order-item/order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Place, Sticker])],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
  exports: [OrderService],
})
export class OrderModule {}
