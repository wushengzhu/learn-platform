import { Result } from '@/common/dto/result.type';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import {
  SUCCESS,
  CARD_NOT_EXIST,
  CARD_DEL_FAIL,
  COURSE_CREATE_FAIL,
} from '@/common/constants/code';
import { CardResult, CardResults } from './dto/result-card.output';
import { CardInput } from './dto/card.input';
import { CardType } from './dto/card.type';
import { CardService } from './card.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { PageInput } from '@/common/dto/page.input';
import { FindOptionsWhere, Like } from 'typeorm';
import { Card } from './models/card.entity';
import { CurShopId } from '@/common/decorators/current-shop.decorator';

@Resolver(() => CardType)
@UseGuards(GqlAuthGuard)
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Query(() => CardResult)
  async getCardById(@Args('id') id: string): Promise<CardResult> {
    const result = await this.cardService.findById(id);
    if (result) {
      return {
        code: SUCCESS,
        data: result,
        message: '获取成功',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: '用户信息不存在',
    };
  }

  @Mutation(() => CardResult)
  async saveCard(
    @Args('params') params: CardInput,
    @Args('courseId') courseId: string,
    @CurUserId() userId: string,
    @CurShopId() shopId: string,
    @Args('id', { nullable: true }) id?: string,
  ): Promise<CardResult> {
    if (id) {
      const card = await this.cardService.findById(id);
      if (!card) {
        return {
          code: CARD_NOT_EXIST,
          message: '消费卡不存在',
        };
      }
      const res = await this.cardService.updateById(card.id, {
        ...params,
        updatedBy: userId,
        shop: {
          id: shopId,
        },
        course: {
          id: courseId,
        },
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    } else {
      const res = await this.cardService.create({
        ...params,
        createdBy: userId,
        shop: {
          id: shopId,
        },
      });
      if (res) {
        return {
          code: SUCCESS,
          message: '创建成功',
        };
      }
      return {
        code: COURSE_CREATE_FAIL,
        message: '操作失败',
      };
    }
  }

  @Query(() => CardResults)
  async getCards(
    @Args('page') page: PageInput,
    @Args('courseId') courseId: string,
    @CurUserId() userId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<CardResults> {
    const { pageNum, pageSize } = page;
    const where: FindOptionsWhere<Card> = {
      createdBy: userId,
      course: { id: courseId },
    };
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const [results, total] = await this.cardService.findCards({
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
  async deleteCard(
    @Args('id') id: string,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const result = await this.cardService.findById(id);
    if (result) {
      const delRes = await this.cardService.deleteById(id, userId);
      if (delRes) {
        return {
          code: SUCCESS,
          message: '删除成功',
        };
      }
      return {
        code: CARD_DEL_FAIL,
        message: '删除失败',
      };
    }
    return {
      code: CARD_NOT_EXIST,
      message: '消费卡信息不存在',
    };
  }
}
