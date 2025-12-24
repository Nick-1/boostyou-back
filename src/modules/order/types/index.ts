import { OrderStatus } from '../enums';
import { Order } from '../order.entity';

export interface OrderFilterParams {
  orderId?: string;
  orderStatus?: OrderStatus;
  userLogin?: string;
  places?: string[];

  page?: number;
  limit?: number;
}

export interface GetOrdersRepositoryResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}
