import { CommonEntity } from '@/common/entities/common.entity';
import { CardRecord } from '@/modules/card-record/models/card-record.entity';
import { Course } from '@/modules/course/models/course.entity';
import { Shop } from '@/modules/shop/models/shop.entity';
import { Schedule } from '@/modules/schedule/models/schedule.entity';
import { Student } from '@/modules/student/models/student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 * 课程表记录
 */
@Entity('scheduleRecord')
export class ScheduleRecord extends CommonEntity {
  @Column({
    comment: '预约时间',
    type: 'timestamp',
    nullable: true,
  })
  subscribeTime: Date;

  @Column({
    comment: '状态',
    nullable: true,
  })
  status: string;

  @ManyToOne(() => Student, { cascade: true })
  student: Student;

  @ManyToOne(() => CardRecord, { cascade: true })
  cardRecord: CardRecord;

  @ManyToOne(() => Schedule, (schedule) => schedule.scheduleRecords, {
    cascade: true,
  })
  schedule: Schedule;

  @ManyToOne(() => Course, { cascade: true })
  course: Course;

  @ManyToOne(() => Shop, {
    cascade: true,
  })
  shop: Shop;
}
