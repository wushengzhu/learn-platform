import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { Result } from '@/common/dto/result.type';
import { ACCOUNT_NOT_EXIST, CODE_EXPIRE, CODE_NOT_EXIST, LOGIN_ERROR, SUCCESS } from '@/common/constants/code';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService,private readonly userService: UserService) {}
  @Mutation(() => Result, { description: '获取短信服务验证码' })
  async sendCodeMsg(@Args('tel') tel:string): Promise<Result> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Boolean, { description: '获取短信服务验证码' })
  async login(@Args('tel') tel:string,@Args('code') code:string): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    if(!user){
      return {
        code:ACCOUNT_NOT_EXIST,
        message:'账号不存在！'
      };
    }
    if(!user?.codeCreateTimeAt||!user?.code){
      return {
        code:CODE_NOT_EXIST,
        message:'验证码不存在！'
      };
    }
    if(dayjs().diff(dayjs(user?.codeCreateTimeAt))>60*60*1000){
      return {
        code:CODE_EXPIRE,
        message:'验证码已过期！'
      };
    }
    if(user.code === code){
      return {
        code:SUCCESS,
        message:'登录成功！',
      }
    }
    return {
      code:LOGIN_ERROR,
      message:'登录失败，手机号或者验证码不正确！'
    };
  }
}
