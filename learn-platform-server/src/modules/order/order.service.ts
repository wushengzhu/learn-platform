import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, FindOptionsWhere } from 'typeorm';
import { Order } from './models/order.entity';
import { OrderStatus } from '@/common/constants/enum';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(entity: DeepPartial<Order>): Promise<boolean> {
    const res = await this.orderRepository.save(
      this.orderRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 获取用户购买该商品的信息,必须是已经支付成功的
   */
  async findByStudentAndProduct(
    studentId: string,
    productId: string,
    shopId: string,
  ): Promise<Order[]> {
    return this.orderRepository.findBy({
      status: OrderStatus.SUCCESS,
      student: {
        id: studentId,
      },
      product: {
        id: productId,
      },
      shop: {
        id: shopId,
      },
    });
  }

  async findByOutTradeNo(outTradeNo: string): Promise<Order> {
    return this.orderRepository.findOne({
      where: {
        outTradeNo,
      },
      relations: ['shop', 'product', 'student'],
    });
  }

  async updateById(id: string, entity: DeepPartial<Order>): Promise<boolean> {
    const existEntity = await this.findById(id);
    if (!existEntity) {
      return false;
    }
    Object.assign(existEntity, entity);
    const res = await this.orderRepository.save(existEntity);
    if (res) {
      return true;
    }
    return false;
  }

  async findOrders({
    start,
    length,
    where,
  }: {
    start: number;
    length: number;
    where: FindOptionsWhere<Order>;
  }): Promise<[Order[], number]> {
    return this.orderRepository.findAndCount({
      take: length,
      skip: start,
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteById(id: string, userId: string): Promise<boolean> {
    const res1 = await this.orderRepository.update(id, {
      deletedBy: userId,
    });
    if (res1) {
      const res = await this.orderRepository.softDelete(id);
      if (res.affected > 0) {
        return true;
      }
    }
    return false;
  }
}
