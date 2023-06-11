import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import {
  SUCCESS,
  SHOP_NOT_EXIST,
  SHOP_FAIL,
  SHOP_DEL_FAIL,
} from '@/common/constants/code';
import { ShopResult, ShopResults } from './dto/result-shop.output';
import { ShopInput } from './dto/shop.input';
import { ShopType } from './dto/shop.type';
import { ShopService } from './shop.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { ShopImageService } from '../shop-image/shopImage.service';
import { FindOptionsWhere, Like } from 'typeorm';
import { Shop } from './models/shop.entity';

@Resolver(() => ShopType)
@UseGuards(GqlAuthGuard)
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,
    private readonly shopImageService: ShopImageService,
  ) {}

  @Query(() => ShopResult)
  async getShopInfoById(@Args() id: string): Promise<ShopResult> {
    const result = await this.shopService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: SHOP_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Mutation(() => ShopResult)
  async commitShopInfo(
    @Args('params') params: ShopInput,
    @CurUserId() userId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<Result> {
    if (id) {
      const shop = await this.shopService.findById(userId);
      if (!shop) {
        return {
          code: SHOP_NOT_EXIST,
          message: '门店信息不存在',
        };
      }
      const delRes = await this.shopImageService.deleteByShop(id);
      if (!delRes) {
        return {
          code: SHOP_FAIL,
          message: '图片删除不成功，无法更新门店信息',
        };
      }
      const res = await this.shopService.updateById(shop.id, {
        ...params,
        updatedBy: userId,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }

    const res = await this.shopService.create({
      ...params,
      createdBy: userId,
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '创建成功',
      };
    }
    return {
      code: SHOP_FAIL,
      message: '操作失败',
    };
  }

  @Query(() => ShopResults)
  async getShops(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<ShopResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Shop> = { createdBy: userId };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.shopService.findShops({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
      where,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }

  @Mutation(() => Result)
  async deleteOrganization(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.shopService.findById(id);
    if (result) {
      const delRes = await this.shopService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: SHOP_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: SHOP_NOT_EXIST,
      message: '门店信息不存在',
    };
  }
}
