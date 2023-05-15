import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  /**
   * 新增用户
   * DeepPartial作用是为所有属性添加可填?
   * @param entity
   * @returns
   */
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.insert(entity);
    if (res && res?.raw?.affectedRows > 0) {
      return true;
    }
    return false;
  }

  /**
   * 删除操作
   * @param id
   * @returns
   */
  async del(id: string): Promise<boolean> {
    const res = await this.UserRepository.delete(id);
    console.log(res);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    console.log(res);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async find(id: string): Promise<boolean> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    console.log(res);
    if (res) {
      return true;
    }
    return false;
  }
}
