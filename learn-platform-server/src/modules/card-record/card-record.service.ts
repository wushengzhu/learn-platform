import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
import { CardRecord } from './models/card-record.entity';
@Injectable()
export class CardRecordService {
  constructor(
    @InjectRepository(CardRecord)
    private readonly card-recordRepository: Repository<CardRecord>,
  ) {}

  async create(entity: DeepPartial<CardRecord>): Promise<boolean> {
    const res = await this.card-recordRepository.save(
      this.card-recordRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<CardRecord> {
    return this.card-recordRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<CardRecord>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.card-recordRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findCardRecords({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<CardRecord>;
  }): Promise<[CardRecord[], number]> {
    return this.card-recordRepository.findAndCount({
      take: length,
      skip: start,
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const res1 = await this.card-recordRepository.update(id, {
      deletedBy: userId,
    });
    if (res1) {
      const res = await this.card-recordRepository.softDelete(id);
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
