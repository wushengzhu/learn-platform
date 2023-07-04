import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ReducibleTimeType } from './common.type';

/**
 * 学员
 */
@ObjectType()
export class CourseType extends CommonType {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({
    nullable: true,
  })
  desc: string;

  @Field({})
  @IsNotEmpty()
  group: string;

  @Field()
  @IsNotEmpty()
  baseAbility: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  limitNumber: number;

  @Field()
  @IsNotEmpty()
  duration: number;

  @Field({
    nullable: true,
  })
  reserveInfo: string;

  @Field({
    nullable: true,
  })
  refundInfo: string;

  @Field({
    nullable: true,
  })
  otherInfo: string;

  @Field(() => [ReducibleTimeType], {
    description: '可约时间',
    nullable: true,
  })
  reducibleTime: ReducibleTimeType[];
}
