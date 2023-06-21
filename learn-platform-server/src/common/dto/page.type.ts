import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IFilters } from './page.input';

@ObjectType()
export class Page {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pageNum?: number;
  @Field(() => Int)
  pageSize?: number;
  // @Field(() => Array<any>)
  // filters?: Array<IFilters>;
}
