export interface OrderListItemPlaceDto {
  id: string;
  name: string;
  city: string;
}

export interface OrderItemDto {
  id: string;
  quantity: number;
  place: OrderListItemPlaceDto;
}

export interface OrderUserDto {
  id: string;
  login: string;
}

export interface OrderListItemDto {
  id: string;
  status: string;
  totalPrice: number;
  currency: string;
  createdAt: Date;
  user: OrderUserDto;
  items: OrderItemDto[];
}

export interface OrderListResponseDto {
  orders: OrderListItemDto[];
  total: number;
  page: number;
  limit: number;
}
