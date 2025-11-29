import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Get('/user/:userId')
  @HttpCode(HttpStatus.OK)
  public async getOrdersByUser(
    @Param('userId') userId: string,
  ): Promise<Order[]> {
    return this.orderService.findByUser(userId);
  }
}
