import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { WxorderType } from './wxorder.type';

@ObjectType()
export class WxorderResult extends createResult(WxorderType) {}

@ObjectType()
export class WxorderResults extends createResults(WxorderType) {}
