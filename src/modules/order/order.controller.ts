import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { GetOrdersQueryDto } from './dto/get-orders.dto';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async getList(@Query() query: GetOrdersQueryDto) {
    console.info('query=========', query);

    return this.orderService.getListByParams({
      orderStatus: query.orderStatus,
      userLogin: query.userLogin,
      places: query.places,
      page: query.page,
      limit: query.limit,
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Get('/user/:userId')
  @HttpCode(HttpStatus.OK)
  public async getOrdersByUserId(
    @Param('userId') userId: string,
  ): Promise<Order[]> {
    return this.orderService.findByUserId(userId);
  }
}
