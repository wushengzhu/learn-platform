import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import {
  SUCCESS,
  STUDENT_NOT_EXIST,
  SHOP_FAIL,
  ACCOUNT_FAIL,
} from '@/common/constants/code';
import { StudentResult, StudentResults } from './dto/result-student.output';
import { StudentInput } from './dto/student.input';
import { StudentType } from './dto/student.type';
import { StudentService } from './student.service';
import { PageInput } from '@/common/dto/page.input';

@Resolver(() => StudentType)
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentResult)
  async getStudentById(@Args('id') id: string): Promise<StudentResult> {
    const result = await this.studentService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Query(() => StudentType, { description: '使用id查询用户' })
  async getStudentInfoByGuard(@Context() cxt: any): Promise<StudentType> {
    const id = cxt.req.user.id;
    return await this.studentService.findById(id);
  }

  @Mutation(() => StudentResult)
  async commitStudent(
    @Args('params') params: StudentInput,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<StudentResult> {
    if (id) {
      const student = await this.studentService.findById(id);
      if (!student) {
        return {
          code: STUDENT_NOT_EXIST,
          message: '学员不存在',
        };
      }

      const res = await this.studentService.updateById(student.id, {
        ...params,
        password: params?.password ? params.password : '123456',
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }

    const res = await this.studentService.create({
      ...params,
      password: params?.password ? params.password : '123456',
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '创建成功',
      };
    }
    return {
      code: ACCOUNT_FAIL,
      message: '操作失败',
    };
  }

  @Query(() => StudentResults)
  async getStudents(@Args('page') page: PageInput): Promise<StudentResults> {
    const { pageNum, pageSize } = page;
    const [results, total] = await this.studentService.findStudents({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
    });
    return {
      code: SUCCESS,
      data: results,
      page: {
        pageNum,
        pageSize,
        total,
      },
      message: '获取成功',
    };
  }
}
