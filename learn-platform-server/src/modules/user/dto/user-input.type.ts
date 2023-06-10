import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;
  @Field({ description: '简介' })
  desc: string;
  @Field({ description: '性别' })
  gender: boolean;
  @Field({ description: '头像' })
  avatar: string;
}
