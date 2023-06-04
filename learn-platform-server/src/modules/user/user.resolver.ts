import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from './dto/user-input.type';
import { UserType } from './dto/user.type';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { description: '新增用户' })
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType, { description: '使用id查询用户' })
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }

  @Query(() => UserType, { description: '使用id查询用户' })
  async getUserInfo(@Context() cxt: any): Promise<UserType> {
    const id = cxt.req.user.id;
    return await this.userService.find(id);
  }

  @Mutation(() => Boolean, { description: '更新用户' })
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<boolean> {
    return await this.userService.update(id, params);
  }

  @Mutation(() => Boolean, { description: '删除用户' })
  async del(@Args('id') id: string): Promise<boolean> {
    return await this.userService.del(id);
  }
}
