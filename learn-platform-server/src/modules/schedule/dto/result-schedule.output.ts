import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { ScheduleType } from './schedule.type';

@ObjectType()
export class ScheduleResult extends createResult(ScheduleType) {}

@ObjectType()
export class ScheduleResults extends createResults(ScheduleType) {}
