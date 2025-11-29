/* eslint-disable */

import 'reflect-metadata';

const AppDataSource = require('../../typeorm.config.js');

import { User } from '../modules/user/user.entity';
import { Franchise } from '../modules/franchise/franchise.entity';
import { Place } from '../modules/place/place.entity';
import { StickerType } from '../modules/sticker-type/sticker-type.entity';
import { Sticker } from '../modules/sticker/sticker.entity';
import { Order } from '../modules/order/order.entity';
import { OrderItem } from '../modules/order-item/order-item.entity';

async function seed() {
  await AppDataSource.initialize();
  console.log('🌱 Connected to DB');

  // ---------------------
  // 1) USER
  // ---------------------
  const user = await AppDataSource.getRepository(User).save({
    login: 'test@example.com',
    password: 'hashed-password',
    role: 'customer',
    status: 'verified',
    first_name: 'John',
    last_name: 'Doe',
  });

  console.log('👤 User created:', user.id);

  // ---------------------
  // 2) FRANCHISES
  // ---------------------
  const franchiseRepo = AppDataSource.getRepository(Franchise);
  const franchises = await franchiseRepo.save([
    { name: 'CoffeeHub', status: 'active' },
    { name: 'BrewSpot', status: 'active' },
  ]);

  console.log('🏪 Franchises:', franchises.map(f => f.id));

  // ---------------------
  // 3) PLACES
  // ---------------------
  const placeRepo = AppDataSource.getRepository(Place);
  const places = await placeRepo.save([
    {
      name: 'CoffeeHub Downtown',
      status: 'active',
      address: '123 Main St',
      city: 'San Francisco',
      country: 'USA',
      state: 'CA',
      phone: '+1 555 111 22 33',
      location: { lat: 37.7749, lng: -122.4194 },
      franchiseId: franchises[0].id,
    },
    {
      name: 'BrewSpot Riverside',
      status: 'active',
      address: '55 Riverside Ave',
      city: 'San Francisco',
      country: 'USA',
      state: 'CA',
      phone: '+1 555 333 44 55',
      location: { lat: 37.7751, lng: -122.4183 },
      franchiseId: franchises[1].id,
    },
  ]);

  console.log('📍 Places:', places.map(p => p.id));

  // ---------------------
  // 4) STICKER TYPES
  // ---------------------
  const stickerTypeRepo = AppDataSource.getRepository(StickerType);
  const stickerTypes = await stickerTypeRepo.save([
    {
      name: 'Default White',
      description: 'Simple clean white sticker',
      redactorBgUrl: 'https://cdn.boostyou.us/default/editor.png',
      originalBgUrl: 'https://cdn.boostyou.us/default/original.png',
      bgColor: '#FFFFFF',
      price: '0.10',
      status: 'active',
    },
    {
      name: 'Eco Green',
      description: 'Eco friendly design',
      redactorBgUrl: 'https://cdn.boostyou.us/eco/editor.png',
      originalBgUrl: 'https://cdn.boostyou.us/eco/original.png',
      bgColor: '#DFF3DF',
      price: '0.14',
      status: 'active',
    },
  ]);

  console.log('🏷 Sticker Types:', stickerTypes.map(t => t.id));

  // ---------------------
  // 5) STICKERS (designed by user)
  // ---------------------
  const stickerRepo = AppDataSource.getRepository(Sticker);
  const stickers = await stickerRepo.save([
    {
      userId: user.id,
      stickerTypeId: stickerTypes[0].id,
      name: 'My Coffee Sticker',
      title: 'Зігрійся!',
      highlightedText: 'Акція 10%',
      highlightedBgColor: '#FFF9C4',
      stickerForm: 'rectangle',
      status: 'active',
    },
  ]);

  console.log('🎨 Stickers:', stickers.map(s => s.id));

  // ---------------------
  // 6) ORDER + ORDER ITEMS
  // ---------------------
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);

  const order = await orderRepo.save({
    userId: user.id,
    status: 'pending',
    currency: 'USD',
    totalPrice: '0.00',
  });

  const itemPrice = stickerTypes[0].price;
  const subtotal = itemPrice * 50;

  await orderItemRepo.save({
    orderId: order.id,
    stickerId: stickers[0].id,
    placeId: places[0].id,
    quantity: 50,
    itemPrice,
    subtotal,
  });

  order.totalPrice = subtotal.toFixed(2);
  await orderRepo.save(order);

  console.log('🧾 Order created:', order.id);

  console.log('🌱 SEED COMPLETED');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
