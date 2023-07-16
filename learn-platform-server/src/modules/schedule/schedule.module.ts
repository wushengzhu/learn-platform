import { ScheduleResolver } from './schedule.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Schedule } from './models/schedule.entity';
import { ScheduleService } from './schedule.service';
import { CourseModule } from '../course/course.module';
import { CardRecordModule } from '../card-record/card-record.module';
import { ScheduleRecordModule } from '../schedule-record/schedule-record.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    CourseModule,
    CardRecordModule,
    ScheduleRecordModule,
  ],
  providers: [ScheduleService, ScheduleResolver],
  exports: [ScheduleService],
})
export class ScheduleModule {}
