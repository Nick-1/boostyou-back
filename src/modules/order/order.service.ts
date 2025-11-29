import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

import { Sticker } from '../sticker/sticker.entity';
import { Place } from '../place/place.entity';
import { OrderItem } from '../order-item/order-item.entity';
import { OrderItemService } from '../order-item/order-item.service';
import { OrderStatus } from './enums';
import { Currency } from '../../common/enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Sticker)
    private readonly stickerRepo: Repository<Sticker>,

    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,

    @Inject()
    private readonly orderItemService: OrderItemService,
  ) {}

  public async createOrder(dto: CreateOrderDto): Promise<Order> {
    if (!dto.items?.length) {
      throw new NotFoundException('Order must contain at least one item');
    }

    const stickerIds = Array.from(new Set(dto.items.map((i) => i.stickerId)));
    const stickers = await this.stickerRepo.find({
      where: { id: In(stickerIds) },
      relations: { stickerType: true },
    });

    if (stickers.length !== stickerIds.length) {
      throw new NotFoundException('Some stickers do not exist');
    }

    const placeIds = Array.from(new Set(dto.items.map((i) => i.placeId)));
    const places = await this.placeRepo.find({
      where: { id: In(placeIds) },
    });

    if (places.length !== placeIds.length) {
      throw new NotFoundException('Some places do not exist');
    }

    const order = this.orderRepo.create({
      userId: dto.userId,
      status: OrderStatus.PENDING,
      currency: Currency.USD,
      comment: dto.comment,
      totalPrice: 0,
    });

    await this.orderRepo.save(order);

    const { totalItemsPrice } = await this.orderItemService.createItemsList(
      order,
      dto.items,
      places,
      stickers,
    );

    order.totalPrice = totalItemsPrice;
    await this.orderRepo.save(order);

    return this.findById(order.id);
  }

  public async findById(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {
        user: true,
        items: {
          sticker: {
            stickerType: true,
          },
          place: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  public async findByUser(userId: string): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      relations: {
        items: {
          sticker: { stickerType: true },
          place: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
