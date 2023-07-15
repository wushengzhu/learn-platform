import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
import { Wxorder } from './models/wxorder.entity';
@Injectable()
export class WxorderService {
  constructor(
    @InjectRepository(Wxorder)
    private readonly wxorderRepository: Repository<Wxorder>,
  ) {}

  async create(entity: DeepPartial<Wxorder>): Promise<Wxorder> {
    const res = await this.wxorderRepository.save(
      this.wxorderRepository.create(entity),
    );
    return res;
  }

  async findById(id: string): Promise<Wxorder> {
    return this.wxorderRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByTransactionId(transactionId: string): Promise<Wxorder> {
    return this.wxorderRepository.findOne({
      where: {
        transaction_id: transactionId,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Wxorder>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.wxorderRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findWxorders({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Wxorder>;
  }): Promise<[Wxorder[], number]> {
    return this.wxorderRepository.findAndCount({
      take: length,
      skip: start,
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const res1 = await this.wxorderRepository.update(id, {
      deletedBy: userId,
    });
    if (res1) {
      const res = await this.wxorderRepository.softDelete(id);
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
