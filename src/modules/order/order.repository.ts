import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { GetOrdersRepositoryResponse, OrderFilterParams } from './types';
import { OrderStatus } from './enums';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  public async findByParams(
    params: OrderFilterParams,
  ): Promise<GetOrdersRepositoryResponse> {
    const { orderStatus, userLogin, places, page = 1, limit = 50 } = params;

    const take = limit > 0 ? limit : 50;
    const currentPage = page > 0 ? page : 1;
    const skip = (currentPage - 1) * take;

    const qb = this.repo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.items', 'item')
      // .leftJoinAndSelect('item.sticker', 'sticker')
      // .leftJoinAndSelect('sticker.stickerType', 'stickerType')
      .leftJoinAndSelect('item.place', 'place');

    if (orderStatus) {
      qb.andWhere('order.status = :status', { status: orderStatus });
    }

    if (userLogin) {
      qb.andWhere('user.login ILIKE :login', { login: `%${userLogin}%` });
    }

    if (places?.length) {
      const orClauses: string[] = [];
      const params: Record<string, string> = {};

      places.forEach((placeName, index) => {
        const paramName = `placeName${index}`;
        orClauses.push(`place.name ILIKE :${paramName}`);
        params[paramName] = `%${placeName}%`;
      });

      qb.andWhere(`(${orClauses.join(' OR ')})`, params);
    }

    if (!orderStatus) {
      qb.addSelect(
        'CASE WHEN "order"."status" = :waitingStatus THEN 0 ELSE 1 END',
        'order_status_sort',
      ).setParameter('waitingStatus', OrderStatus.WAITING_FOR_PRINT);

      qb.orderBy('order_status_sort', 'ASC').addOrderBy(
        'order.createdAt',
        'DESC',
      );
    } else {
      qb.orderBy('order.createdAt', 'DESC');
    }

    const [orders, total] = await qb.skip(skip).take(take).getManyAndCount();

    return {
      orders,
      total,
      page: currentPage,
      limit: take,
    };
  }

  public async findById(id: string): Promise<Order> {
    const order = await this.repo.findOne({
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

  public async findByUserId(userId: string): Promise<Order[]> {
    return this.repo.find({
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
