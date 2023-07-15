import { Field, ObjectType } from '@nestjs/graphql';
import { CardType } from '@/modules/card/dto/card.type';
import { StudentType } from '@/modules/student/dto/student.type';
import { Shop } from '@/modules/shop/models/shop.entity';
import { ShopType } from '@/modules/shop/dto/shop.type';
import { CourseType } from '@/modules/course/dto/course.type';

/**
 * 消费卡
 */
@ObjectType()
export class CardRecordType {
  @Field({
    description: 'id',
  })
  id: string;

  @Field({
    description: '开始时间',
    nullable: true,
  })
  startTime: Date;

  @Field({
    description: '结束时间',
    nullable: true,
  })
  endTime: Date;

  @Field({
    description: '购买时间',
    nullable: true,
  })
  buyTime: Date;

  @Field({
    description: '剩余次数',
    nullable: true,
  })
  residueTime: number;

  @Field({
    description: '状态',
    nullable: true,
  })
  status?: string;

  @Field(() => CardType, { nullable: true, description: '关联卡实体' })
  card: CardType;

  @Field(() => CourseType, { nullable: true, description: '课程' })
  course: CourseType;

  @Field(() => StudentType, { nullable: true, description: '学员' })
  student: StudentType;

  @Field(() => ShopType, { nullable: true, description: '门店' })
  shop: Shop;
}
