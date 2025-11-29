import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sticker } from '../sticker/sticker.entity';
import { Place } from '../place/place.entity';
import { Order } from '../order/order.entity';

import { OrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  public async createItemsList(
    order: Order,
    items: OrderItemDto[],
    places: Place[],
    stickers: Sticker[],
  ): Promise<{ totalItemsPrice: number }> {
    const orderItems: OrderItem[] = [];
    let totalItemsPrice = 0;

    for (const item of items) {
      const sticker = stickers.find((s) => s.id === item.stickerId);
      if (!sticker) {
        throw new NotFoundException(`Sticker ${item.stickerId} not found`);
      }

      if (!sticker.stickerType) {
        throw new NotFoundException(
          `Sticker ${sticker.id} does not have stickerType`,
        );
      }

      const place = places.find((p) => p.id === item.placeId);
      if (!place) {
        throw new NotFoundException(`Place ${item.placeId} not found`);
      }

      const itemPrice = sticker.stickerType.price;
      if (isNaN(itemPrice)) {
        throw new Error(
          `Invalid price for stickerType ${sticker.stickerType.id}`,
        );
      }

      const subtotal = itemPrice * item.quantity;
      totalItemsPrice += subtotal;

      const orderItem = this.orderItemRepo.create({
        orderId: order.id,
        stickerId: item.stickerId,
        placeId: item.placeId,
        quantity: item.quantity,
        itemPrice,
        subtotal,
      });

      orderItems.push(orderItem);
    }

    await this.orderItemRepo.save(orderItems);

    return { totalItemsPrice };
  }
}
