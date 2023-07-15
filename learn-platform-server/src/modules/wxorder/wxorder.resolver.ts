import { FindOptionsWhere } from 'typeorm';
import { Wxorder } from './models/wxorder.entity';
import {
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
} from './../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import { WxorderResult, WxorderResults } from './dto/result-wxorder.output';
import { WxorderType } from './dto/wxorder.type';
import { WxorderService } from './wxorder.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';

@Resolver(() => WxorderType)
@UseGuards(GqlAuthGuard)
export class WxorderResolver {
  constructor(private readonly wxorderService: WxorderService) {}

  @Query(() => WxorderResult)
  async getWxorderInfo(@Args('id') id: string): Promise<WxorderResult> {
    const result = await this.wxorderService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '微信订单信息不存在',
    };
  }

  @Query(() => WxorderResults)
  async getWxorders(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
  ): Promise<WxorderResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Wxorder> = { createdBy: userId };
    const [results, total] = await this.wxorderService.findWxorders({
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
  async deleteWxorder(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.wxorderService.findById(id);
    if (result) {
      const delRes = await this.wxorderService.deleteById(id, userId);
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
}
