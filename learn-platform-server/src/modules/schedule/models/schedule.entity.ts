import { CommonEntity } from '@/common/entities/common.entity';
import { Course } from '@/modules/course/models/course.entity';
import { Shop } from '@/modules/shop/models/shop.entity';
import { ScheduleRecord } from '@/modules/schedule-record/models/schedule-record.entity';
import { Teacher } from '@/modules/teacher/models/teacher.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

/**
 * 课程表
 */
@Entity('schedule')
export class Schedule extends CommonEntity {
  @Column({
    comment: '上课日期',
    nullable: true,
    type: 'timestamp',
  })
  schoolDay: Date;

  @Column({
    comment: '开始时间',
    nullable: true,
  })
  startTime: string;

  @Column({
    comment: '结束时间',
    nullable: true,
  })
  endTime: string;

  @Column({
    comment: '人数限制',
    nullable: true,
  })
  limitNumber: number;

  @ManyToOne(() => Shop, {
    cascade: true,
  })
  shop: Shop;

  @ManyToOne(() => Course, {
    cascade: true,
  })
  course: Course;

  @ManyToOne(() => Teacher, {
    cascade: true,
  })
  teacher?: Teacher;

  @OneToMany(() => ScheduleRecord, (scheduleRecord) => scheduleRecord.schedule)
  scheduleRecords?: ScheduleRecord[];
}
