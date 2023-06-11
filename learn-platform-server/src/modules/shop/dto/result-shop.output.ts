import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { ShopType } from './shop.type';

@ObjectType()
export class ShopResult extends createResult(ShopType) {}

@ObjectType()
export class ShopResults extends createResults(ShopType) {}
