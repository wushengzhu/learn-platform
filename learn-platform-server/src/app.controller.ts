import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';

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
    return await this.userService.del('841eb5a7-5322-4ecd-8608-9ebdc280c10b');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '7b6764c8-9ca5-4fa7-bca0-33a47b56b1c7',
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
  async find(): Promise<boolean> {
    return await this.userService.find('7b6764c8-9ca5-4fa7-bca0-33a47b56b1c7');
  }
}
