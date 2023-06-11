import { Field, InputType } from '@nestjs/graphql';

/**
 *  input
 */
@InputType()
export class ShopImageInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  remark?: string;
}
