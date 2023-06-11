import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopImage } from './models/shop-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopImageService {
  constructor(
    @InjectRepository(ShopImage)
    private readonly shopImageRepository: Repository<ShopImage>,
  ) {}

  async deleteByShop(id): Promise<boolean> {
    const imgs = await this.shopImageRepository
      .createQueryBuilder('shopImage')
      .where(`shopImage.shopIdForFrontId = '${id}'`)
      .orWhere(`shopImage.shopIdForRoomId = '${id}'`)
      .orWhere(`shopImage.shopIdForOtherId = '${id}'`)
      .getMany();
    if (imgs.length === 0) {
      return true;
    }
    const delResult = await this.shopImageRepository.delete(
      imgs.map((item) => item.id),
    );

    if (delResult.affected > 0) {
      return true;
    }
    return false;
  }
}
