import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { FranchiseModule } from './modules/franchise/franchise.module';
import { PlaceModule } from './modules/place/place.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { StickerTypeModule } from './modules/sticker-type/sticker-type.module';
import { StickerModule } from './modules/sticker/sticker.module';

import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      ...databaseConfig,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    FranchiseModule,
    PlaceModule,
    OrderModule,
    OrderItemModule,
    StickerModule,
    StickerTypeModule,
  ],
})
export class AppModule {}
