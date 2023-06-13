import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id?: string;
  @Field({ description: '昵称', nullable: true })
  name?: string;
  @Field({ description: '简介', nullable: true })
  desc?: string;
  @Field({ description: '账号' })
  account?: string;
  @Field({ description: '密码' })
  password?: string;
  @Field({ description: '性别', nullable: true })
  gender?: boolean;
  @Field({ description: 'tel', nullable: true })
  tel?: string;
  @Field({ description: '头像', nullable: true })
  avatar?: string;
}
