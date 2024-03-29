import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import {
  SUCCESS,
  COURSE_NOT_EXIST,
  COURSE_DEL_FAIL,
  COURSE_FAIL,
} from '@/common/constants/code';
import { CourseResult, CourseResults } from './dto/result-course.output';
import { PartialCourseInput } from './dto/course.input';
import { CourseType } from './dto/course.type';
import { CourseService } from './course.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { DeepPartial, FindOptionsWhere, Like } from 'typeorm';
import { Course } from './models/course.entity';
import { CurShopId } from '@/common/decorators/current-shop.decorator';

@Resolver(() => CourseType)
@UseGuards(GqlAuthGuard)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => CourseResult)
  async getCourseById(@Args('id') id: string): Promise<CourseResult> {
    const result = await this.courseService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Mutation(() => CourseResult)
  async saveCourse(
    @Args('params') params: PartialCourseInput,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<CourseResult> {
    if (id) {
      const course = await this.courseService.findById(id);
      if (!course) {
        return {
          code: COURSE_NOT_EXIST,
          message: '课程不存在',
        };
      }
      const courseInput: DeepPartial<Course> = {
        ...params,
        updatedBy: userId,
        teachers: course.teachers,
      };
      if (params.teachers) {
        courseInput.teachers = params.teachers.map((item) => ({ id: item }));
      }
      const res = await this.courseService.updateById(course.id, courseInput);
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    } else {
      const res = await this.courseService.create({
        ...params,
        createdBy: userId,
        shop: {
          id: shopId,
        },
        teachers: params.teachers.map((item) => ({ id: item })),
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '创建成功',
        };
      }
      return {
        code: COURSE_FAIL,
        message: '操作失败',
      };
    }
  }

  @Query(() => CourseResults)
  async getCourses(
    @Args('page') page: PageInput,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<CourseResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Course> = {
      createdBy: userId,
      shop: { id: shopId },
    };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.courseService.findCourses({
      start: pageNum === 1 ? 0 : (pageNum - 1) * pageSize + 1,
      length: pageSize,
      where,
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

  @Mutation(() => Result)
  async deleteCourse(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.courseService.findById(id);
    if (result) {
      const delRes = await this.courseService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: COURSE_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: COURSE_NOT_EXIST,
      message: '课程信息不存在',
    };
  }
}
