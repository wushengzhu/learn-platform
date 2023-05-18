import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '超级管理员',
      desc: '管理员',
      tel: '88888888',
      password: '123456',
      account: 'admin',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('4cf34f50-b647-4d32-934b-2b837e6b204e');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '7bd3aaf3-af02-4618-bacb-70ef3c2ddfe4',
      {
        name: '超级管理员',
        desc: '管理员12344454',
        tel: '88888888',
        password: '123456',
        account: 'admin',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('7bd3aaf3-af02-4618-bacb-70ef3c2ddfe4');
  }
}
