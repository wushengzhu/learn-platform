import { ObjectType } from '@nestjs/graphql';

import { createResult, createResults } from '@/common/dto/result.type';
import { TeacherType } from './teacher.type';

@ObjectType()
export class TeacherResult extends createResult(TeacherType) {}

@ObjectType()
export class TeacherResults extends createResults(TeacherType) {}
