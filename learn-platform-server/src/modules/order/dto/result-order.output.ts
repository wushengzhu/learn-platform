import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { OrderType } from './order.type';

@ObjectType()
export class OrderResult extends createResult(OrderType) {}

@ObjectType()
export class OrderResults extends createResults(OrderType) {}
