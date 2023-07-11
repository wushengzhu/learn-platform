import { StudentService } from './../student/student.service';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { Result } from '@/common/dto/result.type';
import {
  ACCOUNT_EXIST,
  ACCOUNT_NOT_EXIST,
  CODE_EXPIRE,
  CODE_NOT_EXIST,
  LOGIN_ERROR,
  REGISTER_ERROR,
  SUCCESS,
} from '@/common/constants/code';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { accountAndPwdValidate } from '@/shared/utils';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtSvc: JwtService,
    private readonly studentService: StudentService,
  ) {}

  @Mutation(() => Result, { description: '获取短信服务验证码' })
  async sendCodeMsg(@Args('tel') tel: string): Promise<Result> {
    return await this.authService.sendCodeMsg(tel);
  }

  @Mutation(() => Result, { description: '电话登录' })
  async login(
    @Args('tel') tel: string,
    @Args('code') code: string,
  ): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在！',
      };
    }
    if (!user?.codeCreateTimeAt || !user?.code) {
      return {
        code: CODE_NOT_EXIST,
        message: '验证码不存在！',
      };
    }
    if (dayjs().diff(dayjs(user?.codeCreateTimeAt)) > 60 * 60 * 1000) {
      return {
        code: CODE_EXPIRE,
        message: '验证码已过期！',
      };
    }
    if (user.code === code) {
      const token = this.jwtSvc.sign({ id: user.id });
      return {
        code: SUCCESS,
        message: '登录成功！',
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: '登录失败，手机号或者验证码不正确！',
    };
  }

  @Mutation(() => Result, { description: '学员登录' })
  async studentLogin(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (!student) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }
    // 需要对密码进行 md5 加密
    if (student.password === password) {
      const token = this.jwtSvc.sign({
        id: student.id,
      });
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: '登录失败，账号或者密码不对',
    };
  }

  @Mutation(() => Result, { description: '学员注册' })
  async studentRegister(
    @Args('account') account: string,
    @Args('password') password: string,
    @Args('avatar', { nullable: true }) avatar?: string,
    @Args('tel', { nullable: true }) tel?: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const student = await this.studentService.findByAccount(account);
    if (student) {
      return {
        code: ACCOUNT_EXIST,
        message: '账号已经存在，请使用其他账号',
      };
    }
    const res = await this.studentService.create({
      account,
      password: password,
      avatar,
      tel,
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '注册成功',
      };
    }
    return {
      code: REGISTER_ERROR,
      message: '注册失败',
    };
  }

  @Mutation(() => Result, { description: '用户登录' })
  async userLogin(
    @Args('account') account: string,
    @Args('password') password: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const user = await this.userService.findByAccount(account);
    if (!user) {
      return {
        code: ACCOUNT_NOT_EXIST,
        message: '账号不存在',
      };
    }
    // 需要对密码进行 md5 加密
    if (user.password === password) {
      const token = this.jwtSvc.sign({
        id: user.id,
      });
      return {
        code: SUCCESS,
        message: '登录成功',
        data: token,
      };
    }
    return {
      code: LOGIN_ERROR,
      message: '登录失败，账号或者密码不对',
    };
  }

  @Mutation(() => Result, { description: '用户注册' })
  async userRegister(
    @Args('account') account: string,
    @Args('password') password: string,
    @Args('avatar') avatar: string,
    @Args('tel') tel?: string,
  ): Promise<Result> {
    const result = accountAndPwdValidate(account, password);
    if (result.code !== SUCCESS) {
      return result;
    }
    const user = await this.userService.findByAccount(account);
    if (user) {
      return {
        code: ACCOUNT_EXIST,
        message: '账号已经存在，请使用其他账号',
      };
    }
    const res = await this.userService.create({
      account,
      password: password,
      avatar,
      tel,
    });
    if (res) {
      return {
        code: SUCCESS,
        message: '注册成功',
      };
    }
    return {
      code: REGISTER_ERROR,
      message: '注册失败',
    };
  }
}
