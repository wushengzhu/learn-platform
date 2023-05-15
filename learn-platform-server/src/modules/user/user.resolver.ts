import { Args, Mutation, Resolver,Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserInput } from "./user-input.type";
import { UserType } from "./user.type";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => Boolean)
  async create(@Args('params') params: UserInput): Promise<boolean> {
    return await this.userService.create(params);
  }

  @Query(() => UserType)
  async find(@Args('id') id: string): Promise<UserType> {
    return await this.userService.find(id);
  }
}