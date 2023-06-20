import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { UserType } from './user.type';

@ObjectType()
export class UserResult extends createResult(UserType) {}

@ObjectType()
export class UserResults extends createResults(UserType) {}
