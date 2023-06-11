import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopImage } from '../shop-image/models/shop-image.entity';
import { ShopImageService } from '../shop-image/shopImage.service';

import { Shop } from './models/shop.entity';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, ShopImage])],
  providers: [ShopService, ShopResolver, ShopImageService],
  exports: [ShopService],
})
export class ShopModule {}
