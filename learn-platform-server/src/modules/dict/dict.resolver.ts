import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';

import { DictType } from './dto/dict.type';
import { DictService } from './dict.service';
import { DictResult, DictResults } from './dto/result-dict.output';
import {
  DICT_DEL_FAIL,
  DICT_FAIL,
  DICT_NOT_EXIST,
  DICT_REPEAT,
  SUCCESS,
} from '@/common/constants/code';
import { DictInput } from './dto/dict.input';
import { IFilters, PageInput } from '@/common/dto/page.input';
import { Equal, FindOptionsWhere, Like } from 'typeorm';
import { Dict } from './models/dict.entity';

@Resolver(() => DictType)
@UseGuards(GqlAuthGuard)
export class DictResolver {
  constructor(private readonly dictService: DictService) {}

  @Query(() => DictResult)
  async getDictInfoById(@Args('id') id: string): Promise<DictResult> {
    const result = await this.dictService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: DICT_NOT_EXIST,
      message: '本字典不存在',
    };
  }

  @Query(() => DictResults)
  async getDictsByParentId(
    @Args('parentId') parentId: string,
  ): Promise<DictResults> {
    const result = await this.dictService.findByParentId(parentId);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: DICT_NOT_EXIST,
      message: '本字典不存在',
    };
  }

  @Mutation(() => DictResult)
  async saveDict(
    @Args('params') params: DictInput,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<DictResult> {
    if (params?.dictName) {
      const dict = await this.dictService.findByName(params?.dictName);
      if (dict && !id) {
        return {
          code: DICT_REPEAT,
          message: '字典名称已存在',
        };
      }
    }
    // 排除掉id为时间戳的数据
    if (!/^\d+$/.test(id)) {
      const dict = await this.dictService.findById(id);
      if (!dict) {
        return {
          code: DICT_NOT_EXIST,
          message: '字典不存在',
        };
      }
      const res = await this.dictService.updateById(dict.id, {
        ...params,
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }

    const res = await this.dictService.create({
      ...params,
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '创建成功',
      };
    }
    return {
      code: DICT_FAIL,
      message: '操作失败',
    };
  }

  @Query(() => DictResults)
  async getDicts(
    @Args('page') page: PageInput,
    @Args('parentId', { nullable: true }) parentId?: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('code', { nullable: true }) code?: string,
    // @Args('filters', { nullable: true }) filters?: Array<IFilters>,
  ): Promise<DictResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Dict> = {};
    if (name) {
      where.dictName = Like(`%${name}%`);
    }
    if (code) {
      where.dictCode = Equal(code);
    }
    if (parentId) {
      where.parentId = Equal(parentId);
    }
    const [results, total] = await this.dictService.findDicts({
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
  async deleteDict(@Args('id') id: string): Promise<Result> {
    if (id && !/^\d+$/.test(id)) {
      const delRes = await this.dictService.deleteById(id);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: DICT_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: DICT_NOT_EXIST,
      message: '字典不存在',
    };
  }
}
