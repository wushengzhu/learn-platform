import { FindOptionsWhere, Like } from 'typeorm';
import { CardRecord } from './models/card-record.entity';
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
import { CardRecordResult, CardRecordResults } from './dto/result-card-record.output';
import { CardRecordInput } from './dto/card-record.input';
import { CardRecordType } from './dto/card-record.type';
import { CardRecordService } from './card-record.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';

@Resolver(() => CardRecordType)
@UseGuards(GqlAuthGuard)
export class CardRecordResolver {
  constructor(private readonly card-recordService: CardRecordService) {}

  @Query(() => CardRecordResult)
  async getCardRecordInfo(@Args('id') id: string): Promise<CardRecordResult> {
    const result = await this.card-recordService.findById(id);
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

  @Mutation(() => CardRecordResult)
  async saveCardRecord(
    @Args('params') params: CardRecordInput,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('id', { nullable: true }) id: string,
  ): Promise<Result> {
    if (!id) {
      const res = await this.card-recordService.create({
        ...params,
        createdBy: userId,
        shop: {
          id: shopId,
        }
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
    const card-record = await this.card-recordService.findById(id);
    if (card-record) {
      const res = await this.card-recordService.updateById(card-record.id, {
        ...params,
        updatedBy: userId,
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

  @Query(() => CardRecordResults)
  async getCardRecords(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<CardRecordResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<CardRecord> = { createdBy: userId };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.card-recordService.findCardRecords({
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
  async deleteCardRecord(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.card-recordService.findById(id);
    if (result) {
      const delRes = await this.card-recordService.deleteById(id, userId);
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
