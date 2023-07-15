import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CardRecordInput {
  @Field({
    description: '昵称',
  })
  name: string;
}
