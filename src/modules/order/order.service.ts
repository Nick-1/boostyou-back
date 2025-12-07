import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Currency } from '../../common/enums';
import { OrderItemService } from '../order-item/order-item.service';

import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './enums';
import { OrderFilterParams } from './types';
import { OrderRepository } from './order.repository';
import { toGetOrdersResponseDto } from './mappers';
import { OrderListResponseDto } from './dto/get-orders-response.dto';
import { StickerService } from '../sticker/sticker.service';
import { PlaceService } from '../place/place.service';
import { extractUniqueIds } from '../../common/helpers';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @Inject()
    private readonly orderItemService: OrderItemService,

    @Inject()
    private readonly stickerService: StickerService,

    @Inject()
    private readonly placeService: PlaceService,

    private readonly orderRepository: OrderRepository,
  ) {}

  public async getListByParams(
    params: OrderFilterParams,
  ): Promise<OrderListResponseDto> {
    const response = await this.orderRepository.findByParams(params);

    return toGetOrdersResponseDto(response);
  }

  public async create(dto: CreateOrderDto): Promise<Order> {
    if (!dto.items?.length) {
      throw new NotFoundException('Order must contain at least one item');
    }

    const stickerIds = extractUniqueIds(dto.items, 'stickerId');
    const stickers = await this.stickerService.findByIdList(stickerIds);

    const placeIds = extractUniqueIds(dto.items, 'placeId');
    const places = await this.placeService.findByIdList(placeIds);

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
    return this.orderRepository.findById(id);
  }

  public async findByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }
}
