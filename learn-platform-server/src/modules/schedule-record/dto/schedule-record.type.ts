import { ObjectType, Field } from '@nestjs/graphql';
import { StudentType } from '@/modules/student/dto/student.type';
import { ScheduleType } from '@/modules/schedule/dto/schedule.type';
import { ShopType } from '@/modules/shop/dto/shop.type';
import { CourseType } from '@/modules/course/dto/course.type';

/**
 * 约课记录
 */
@ObjectType('ScheduleRecordType')
export class ScheduleRecordType {
  @Field({
    description: 'id',
  })
  id: string;

  @Field({
    description: '状态',
    nullable: true,
  })
  status: string;

  @Field({
    description: '预约时间',
    nullable: true,
  })
  subscribeTime: Date;

  @Field(() => StudentType, { nullable: true, description: '学员' })
  student: StudentType;

  @Field(() => ScheduleType, { nullable: true, description: '课程表' })
  schedule: ScheduleType;

  @Field(() => ShopType, { nullable: true, description: '机构信息' })
  shop: ShopType;

  @Field(() => CourseType, { nullable: true, description: '课程' })
  course: CourseType;
}
