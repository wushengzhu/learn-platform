import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Shop } from './models/shop.entity';
@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}
  /**
   * 创建门店
   * @param entity
   * @returns
   */
  async create(entity: DeepPartial<Shop>): Promise<boolean> {
    const res = await this.shopRepository.save(
      this.shopRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Shop> {
    return this.shopRepository.findOne({
      where: {
        id,
      },
      relations: ['shopFrontImg', 'shopRoomImg', 'shopOtherImg'],
    });
  }

  async updateById(id: string, entity: DeepPartial<Shop>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.shopRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findShops({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Shop>;
  }): Promise<[Shop[], number]> {
    return this.shopRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
      where,
      relations: ['shopFrontImg', 'shopRoomImg', 'shopOtherImg'],
    });
  }

  /**
   * 删除操作
   * @param id
   * @returns
   */
  async deleteById(id: string, userId: string): Promise<boolean> {
    const res = await this.shopRepository.update(id, {
      deletedBy: userId,
    });
    if (res) {
      const res1 = await this.shopRepository.softDelete(id);
      if (res1.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
