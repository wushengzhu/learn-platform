import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentRegisterInput {
  @Field({
    description: '账号',
  })
  account: string;

  @Field({
    description: '手机号',
  })
  tel: string;

  @Field({
    description: '头像',
  })
  avatar: string;

  @Field({
    description: '密码',
  })
  password: string;
}
