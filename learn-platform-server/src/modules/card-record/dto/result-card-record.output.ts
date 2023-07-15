import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { CardRecordType } from './card-record.type';

@ObjectType()
export class CardRecordResult extends createResult(CardRecordType) {}

@ObjectType()
export class CardRecordResults extends createResults(CardRecordType) {}
