import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

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
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async find(id: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  // 查询一个用户通过手机号
  async findByTel(tel: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        tel,
      },
    });
    return res;
  }

  // 查询一个用户通过账号
  async findByAccount(account: string): Promise<User> {
    return this.UserRepository.findOne({
      where: {
        account,
      },
    });
  }

  // 更新一个用户的验证码
  async updateCode(id: string, code: string): Promise<boolean> {
    const res = await this.UserRepository.update(id, {
      code,
      codeCreateTimeAt: new Date(),
    });
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findUsers({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<User>;
  }): Promise<[User[], number]> {
    return this.UserRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        id: 'DESC',
      },
      where,
    });
  }
}
