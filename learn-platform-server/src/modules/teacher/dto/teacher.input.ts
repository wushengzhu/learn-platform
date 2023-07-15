import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TeacherInput {
  @Field({
    description: '名称',
  })
  name: string;

  @Field({
    description: '照片',
  })
  photoUrl: string;

  @Field({
    description: '教龄',
    nullable: true,
  })
  teacherTime: number;

  @Field({
    description: '风格标签，以，隔开',
    nullable: true,
  })
  tags: string;

  @Field({
    description: '学历',
    nullable: true,
  })
  education: string;

  @Field({
    description: '资历',
    nullable: true,
  })
  seniority: string;

  @Field({
    description: '职业经验',
    nullable: true,
  })
  experience: string;

  @Field({
    description: '获奖经历',
    nullable: true,
  })
  carryPrize: string;
}
