import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Card } from './models/card.entity';
@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly courseRepository: Repository<Card>,
  ) {}

  async create(entity: DeepPartial<Card>): Promise<boolean> {
    const res = await this.courseRepository.save(
      this.courseRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Card> {
    return this.courseRepository.findOne({
      where: {
        id,
      },
      relations: ['course', 'shop'],
    });
  }

  async updateById(id: string, entity: DeepPartial<Card>): Promise<boolean> {
    const res = await this.courseRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findCards({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Card>;
  }): Promise<[Card[], number]> {
    return this.courseRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
      relations: ['course'],
      where,
    });
  }

  /**
   * 删除操作
   * @param id
   * @returns
   */
  async deleteById(id: string, userId: string): Promise<boolean> {
    const res = await this.courseRepository.update(id, {
      deletedBy: userId,
    });
    if (res) {
      const res1 = await this.courseRepository.softDelete(id);
      if (res1.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
