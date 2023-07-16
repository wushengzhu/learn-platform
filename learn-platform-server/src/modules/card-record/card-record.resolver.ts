import { FindOptionsWhere } from 'typeorm';
import { CardRecord } from './models/card-record.entity';
import {
  CARD_NOT_EXIST,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
} from '../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import {
  CardRecordResult,
  CardRecordResults,
} from './dto/result-card-record.output';
import { CardRecordType } from './dto/card-record.type';
import { CardRecordService } from './card-record.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { CardStatus, CardType } from '@/common/constants/enum';
import * as dayjs from 'dayjs';

@Resolver(() => CardRecordType)
@UseGuards(GqlAuthGuard)
export class CardRecordResolver {
  constructor(private readonly cardRecordService: CardRecordService) {}

  @Query(() => CardRecordResult)
  async getCardRecordById(@Args('id') id: string): Promise<CardRecordResult> {
    const result = await this.cardRecordService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: '消费卡信息不存在',
    };
  }

  @Query(() => CardRecordResults, { description: '获取个人的消费卡' })
  async getCardRecordsForH5(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
  ): Promise<CardRecordResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<CardRecord> = {
      student: {
        id: userId,
      },
    };
    const [results, total] = await this.cardRecordService.findCardRecords({
      start: (pageNum - 1) * pageSize,
      length: pageSize,
      where,
    });

    const newRes = results.map((c) => {
      let status = CardStatus.VALID;
      // 过期了
      if (dayjs().isAfter(c.endTime)) {
        status = CardStatus.EXPIRED;
      }

      // 耗尽了
      if (c.card.type === CardType.TIME && c.residueTime === 0) {
        status = CardStatus.DEPLETE;
      }
      return {
        ...c,
        status,
      };
    });

    return {
      code: SUCCESS,
      data: newRes,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }

  @Query(() => CardRecordResults)
  async getCardRecords(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
  ): Promise<CardRecordResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<CardRecord> = { createdBy: userId };
    const [results, total] = await this.cardRecordService.findCardRecords({
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
    const result = await this.cardRecordService.findById(id);
    if (result) {
      const delRes = await this.cardRecordService.deleteById(id, userId);
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

  // 获取当前学员在某个课程上可以用的消费卡
  @Query(() => CardRecordResults, {
    description: '获取当前学员在某个课程上可以用的消费卡',
  })
  async getUseCardRecordsByCourse(
    @Args('courseId') courseId: string,
    @CurUserId() userId: string,
  ): Promise<CardRecordResults> {
    const [cards, total] = await this.cardRecordService.findUseCards(
      userId,
      courseId,
    );

    return {
      code: SUCCESS,
      message: '获取成功',
      data: cards,
      page: {
        total,
      },
    };
  }
}
