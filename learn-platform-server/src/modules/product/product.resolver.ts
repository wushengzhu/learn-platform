import { FindOptionsWhere, Like } from 'typeorm';
import { Product } from './models/product.entity';
import {
  COURSE_CREATE_FAIL,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
  COURSE_UPDATE_FAIL,
} from './../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import {
  ProductResult,
  ProductResults,
  ProductTypesResults,
} from './dto/result-product.output';
import { PartialProductInput } from './dto/product.input';
import { ProductType } from './dto/product.type';
import { ProductService } from './product.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { CurShopId } from '@/common/decorators/current-shop.decorator';
import { ProductStatus } from '@/common/constants/enum';
import { PRODUCT_TYPES } from '@/common/constants/product-types';

@Resolver(() => ProductType)
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * 获取商品分类数据
   * @returns
   */
  @Query(() => ProductTypesResults)
  async getProductTypes(): Promise<ProductTypesResults> {
    return {
      code: SUCCESS,
      data: PRODUCT_TYPES,
      message: '获取成功',
    };
  }

  @Query(() => ProductResult)
  async getProductById(@Args('id') id: string): Promise<ProductResult> {
    const result = await this.productService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '课程信息不存在',
    };
  }

  @Mutation(() => ProductResult)
  async saveProduct(
    @Args('params') params: PartialProductInput,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.productService.create({
        ...params,
        createdBy: userId,
        cards: [],
        // 初始化当前的库存为总库存数
        curStock: params.stock,
        status: ProductStatus.UN_LIST,
        shop: {
          id: shopId,
        },
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '创建成功',
        };
      }
      return {
        code: COURSE_CREATE_FAIL,
        message: '创建失败',
      };
    }
    const product = await this.productService.findById(id);
    if (product) {
      const res = await this.productService.updateById(product.id, {
        ...params,
        updatedBy: userId,
        cards: [],
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
      return {
        code: COURSE_UPDATE_FAIL,
        message: '更新失败',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '课程信息不存在',
    };
  }

  @Query(() => ProductResults)
  async getProducts(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<ProductResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Product> = { createdBy: userId };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    if (shopId) {
      where.shop = {
        id: shopId,
      };
    }
    const [results, total] = await this.productService.findProducts({
      start: (pageNum - 1) * pageSize,
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
  async deleteProduct(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.productService.findById(id);
    if (result) {
      const delRes = await this.productService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: COURSE_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '门店信息不存在',
    };
  }

  @Query(() => ProductResults)
  async getProductsForH5(
    @Args('page') page: PageInput,
    @Args('latitude') latitude: number, // 纬度
    @Args('longitude') longitude: number, // 经度
    @Args('type', { nullable: true }) type?: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<ProductResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Product> = {};
    if (name) {
      where.name = name;
    }
    if (type) {
      where.type = type;
    }

    const total = await this.productService.getCount({
      where,
    });

    const { entities, raw } =
      await this.productService.findProductsOrderByDistance({
        start: (pageNum - 1) * pageSize,
        length: pageSize,
        where,
        position: {
          latitude,
          longitude,
        },
      });

    return {
      code: SUCCESS,
      data: entities.map((item, index) => {
        const distance = raw[index].distance;
        let distanceLabel = '>5km';
        if (distance < 1000 && distance > 0) {
          distanceLabel = `${parseInt(distance.toString(), 10)}m`;
        }
        if (distance >= 1000) {
          distanceLabel = `${parseInt((distance / 100).toString(), 10) / 10}km`;
        }
        if (distance > 5000) {
          distanceLabel = '>5km';
        }
        return {
          ...item,
          distance: distanceLabel,
        };
      }),
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }
}
