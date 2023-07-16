import { ScheduleRecordResolver } from './schedule-record.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleRecord } from './models/schedule-record.entity';
import { ScheduleRecordService } from './schedule-record.service';
import { CardRecordModule } from '../card-record/card-record.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleRecord]), CardRecordModule],
  providers: [ScheduleRecordService, ScheduleRecordResolver],
  exports: [ScheduleRecordService],
})
export class ScheduleRecordModule {}
