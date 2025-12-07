import { OrderListResponseDto } from '../dto/get-orders-response.dto';
import { GetOrdersRepositoryResponse } from '../types';

export const toGetOrdersResponseDto = (
  repositoryResponse: GetOrdersRepositoryResponse,
): OrderListResponseDto => {
  const { orders, total, limit, page } = repositoryResponse;

  return {
    total,
    page,
    limit,
    orders: orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      currency: order.currency,
      createdAt: order.createdAt,
      user: {
        id: order.user.id,
        login: order.user.login,
      },
      items: order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        place: {
          id: item.place.id,
          name: item.place.name,
          city: item.place.city,
        },
      })),
    })),
  };
};
