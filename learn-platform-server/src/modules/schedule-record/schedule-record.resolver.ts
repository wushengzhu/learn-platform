import {
  CANCEL_SCHEDULE_FAIL,
  COURSE_DEL_FAIL,
  COURSE_NOT_EXIST,
  SCHEDULE_RECORD_NOT_EXIST,
} from './../../common/constants/code';
import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { SUCCESS } from '@/common/constants/code';
import {
  ScheduleRecordResult,
  ScheduleRecordResults,
} from './dto/result-schedule-record.output';
import { ScheduleRecordType } from './dto/schedule-record.type';
import { ScheduleRecordService } from './schedule-record.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { CardType, ScheduleStatus } from '@/common/constants/enum';
import * as dayjs from 'dayjs';
import { CardRecordService } from '../card-record/card-record.service';

@Resolver(() => ScheduleRecordType)
@UseGuards(GqlAuthGuard)
export class ScheduleRecordResolver {
  constructor(
    private readonly scheduleRecordService: ScheduleRecordService,
    private readonly cardRecordService: CardRecordService,
  ) {}

  @Query(() => ScheduleRecordResult)
  async getScheduleRecordInfo(
    @Args('id') id: string,
  ): Promise<ScheduleRecordResult> {
    const result = await this.scheduleRecordService.findById(id);
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

  @Query(() => ScheduleRecordResults, {
    description: '获取某人的课程表',
  })
  async getScheduleRecords(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
  ): Promise<ScheduleRecordResults> {
    // 第一步：获取我的课程表列表
    const { pageNum, pageSize } = page;
    const [scheduleRecords, total] =
      await this.scheduleRecordService.findScheduleRecords({
        start: (pageNum - 1) * pageSize,
        length: pageSize,
        where: {
          student: {
            id: userId,
          },
        },
      });

    const data: ScheduleRecordType[] = [];
    // 第二步：完善课程表状态
    for (const scheduleRecord of scheduleRecords) {
      let status = ScheduleStatus.NO_DO;
      const { schedule } = scheduleRecord;
      // 20230302 12:12:12
      const startTime = dayjs(
        `${dayjs(schedule.schoolDay).format('YYYYMMDD')} ${schedule.startTime}`,
        'YYYYMMDD HH:mm:ss',
      );
      // 已经开始
      if (dayjs().isAfter(startTime)) {
        status = ScheduleStatus.DOING;
      }
      const endTime = dayjs(
        `${dayjs(schedule.schoolDay).format('YYYYMMDD')} ${schedule.endTime}`,
        'YYYYMMDD HH:mm:ss',
      );

      // 已经结束了
      if (dayjs().isAfter(endTime)) {
        status = ScheduleStatus.FINISH;
      }

      if (!scheduleRecord.status) {
        data.push({
          ...scheduleRecord,
          status,
        });
      } else {
        data.push(scheduleRecord);
      }
    }
    return {
      code: SUCCESS,
      data,
      message: '获取成功',
      page: {
        pageNum,
        pageSize,
        total,
      },
    };
  }

  @Mutation(() => Result)
  async deleteScheduleRecord(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.scheduleRecordService.findById(id);
    if (result) {
      const delRes = await this.scheduleRecordService.deleteById(id, userId);
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

  // 取消已经预约的课程
  @Mutation(() => Result, {
    description: '取消已经预约的课程',
  })
  async cancelSubscribeCourse(
    @Args('scheduleRecordId') scheduleRecordId: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    // 第一步：各种的校验
    const scheduleRecord = await this.scheduleRecordService.findById(
      scheduleRecordId,
    );

    if (!scheduleRecord) {
      return {
        code: SCHEDULE_RECORD_NOT_EXIST,
        message: '没有预约记录，不能取消',
      };
    }

    // 已经取消的状态
    if (scheduleRecord.status === ScheduleStatus.CANCEL) {
      return {
        code: CANCEL_SCHEDULE_FAIL,
        message: '取消失败，不要重复取消预约',
      };
    }

    const { schedule } = scheduleRecord;

    const startTime = dayjs(
      `${dayjs(schedule.schoolDay).format('YYYYMMDD')} ${schedule.startTime}`,
      'YYYYMMDD HH:mm:ss',
    );

    // 课程已经开始，不能取消了
    if (dayjs().isAfter(startTime.subtract(15, 'm'))) {
      return {
        code: CANCEL_SCHEDULE_FAIL,
        message: '课程已经开始了，不能取消了',
      };
    }
    // 第二步，取消预约，更新状态
    const res = await this.scheduleRecordService.updateById(scheduleRecordId, {
      status: ScheduleStatus.CANCEL,
      updatedBy: userId,
    });

    if (!res) {
      return {
        code: CANCEL_SCHEDULE_FAIL,
        message: '预约记录更新失败',
      };
    }
    // 第三步，卡归还
    const cardRecord = await this.cardRecordService.findById(
      scheduleRecord.cardRecord.id,
    );
    if (cardRecord.card.type === CardType.TIME) {
      const r = await this.cardRecordService.updateById(cardRecord.id, {
        residueTime: cardRecord.residueTime + 1,
        updatedBy: userId,
      });
      if (!r) {
        return {
          code: CANCEL_SCHEDULE_FAIL,
          message: '归还卡次数失败',
        };
      }
    }
    return {
      code: SUCCESS,
      message: '取消成功',
    };
  }
}
