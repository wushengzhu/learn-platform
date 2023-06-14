import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { DictType } from './dict.type';

@ObjectType()
export class DictResult extends createResult(DictType) {}

@ObjectType()
export class DictResults extends createResults(DictType) {}
