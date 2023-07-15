import { CommonType } from '@/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 
 */
@ObjectType()
export class CardRecordType extends CommonType {
  @Field({
    description: '昵称',
    nullable: true,
  })
  name: string;
}
