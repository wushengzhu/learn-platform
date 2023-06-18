import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Dict } from './models/dict.entity';
@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly dictRepository: Repository<Dict>,
  ) {}

  /**
   * 创建门店
   * @param entity
   * @returns
   */
  async create(entity: DeepPartial<Dict>): Promise<boolean> {
    const res = await this.dictRepository.save(
      this.dictRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Dict> {
    return this.dictRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByName(dictName: string): Promise<boolean> {
    const res = await this.dictRepository.findOne({
      where: {
        dictName,
      },
    });
    if (res) {
      return true;
    }
    return false;
  }

  async updateById(id: string, entity: DeepPartial<Dict>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.dictRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findDicts({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Dict>;
  }): Promise<[Dict[], number]> {
    return this.dictRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        id: 'DESC',
      },
      where,
    });
  }

  /**
   * 删除操作
   * @param id
   * @returns
   */
  async deleteById(id: string): Promise<boolean> {
    const res = await this.dictRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
