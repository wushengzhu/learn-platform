import { Field, InputType } from '@nestjs/graphql';

/**
 * 消费卡
 */
@InputType('CardInput')
export class CardInput {
  @Field({
    description: '名字',
  })
  name: string;

  @Field({
    description: '卡类型 次数：time 时长：duration',
  })
  type: string;

  @Field({
    description: '上课次数',
    nullable: true,
  })
  time: number;

  @Field({
    description: '有效期 （天）',
  })
  validityDay: number;
}
