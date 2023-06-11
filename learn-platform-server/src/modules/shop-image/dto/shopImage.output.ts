import { Field, ObjectType } from '@nestjs/graphql';

/**
 *  input
 */
@ObjectType()
export class ShopImageType {
  @Field({ nullable: true })
  id?: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  remark?: string;
}
