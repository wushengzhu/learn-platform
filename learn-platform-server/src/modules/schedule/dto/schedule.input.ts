import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduleInput {
  @Field({
    description: '昵称',
  })
  name: string;
}
