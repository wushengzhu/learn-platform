import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsInt, Min } from 'class-validator';

export interface IFilters {
  field: string;
  operate: string;
  value: any;
}

@InputType()
export class PageInput {
  @Field()
  @IsInt()
  @Min(0)
  pageNum: number;

  @Field()
  @IsInt()
  @Min(0)
  pageSize: number;

  // @Field()
  // @IsArray()
  // filters: Array<IFilters>;
}
