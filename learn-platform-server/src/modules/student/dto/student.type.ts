import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 学员
 */
@ObjectType()
export class StudentType {
  @Field()
  id: string;

  @Field({
    description: '昵称',
    nullable: true,
  })
  name: string;

  @Field({
    description: '手机号',
    nullable: true,
  })
  tel: string;

  @Field({
    description: '头像',
    nullable: true,
  })
  avatar: string;

  @Field({
    description: '账号',
    nullable: true,
  })
  account: string;

  @Field({
    description: '密码',
    nullable: true,
  })
  password: string;

  @Field({ description: '简介', nullable: true })
  desc?: string;

  @Field({ description: '性别', nullable: true })
  gender?: boolean;

  @Field({
    description: 'openid',
    nullable: true,
  })
  openid?: string;
}
