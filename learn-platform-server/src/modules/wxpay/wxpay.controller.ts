import { Controller, Get, Query, Res } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import axios from 'axios';

@Controller('wx')
export class WxpayController {
  constructor(private readonly studentService: StudentService) {}

  // wx/login
  @Get('login')
  async wxLogin(
    @Query('userId') userId: string,
    @Query('url') url: string,
    @Res() res,
  ): Promise<void> {
    res.redirect(`
    https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      process.env.WXPAY_APPID
    }&redirect_uri=${
      process.env.WXPAY_URL
    }/wx/wxCode&response_type=code&scope=snsapi_base&state=${userId}@${encodeURIComponent(
      url,
    )}#wechat_redirect
  `);
  }

  //  /wx/wxCode
  /**
   * 用code去获取accesstoken最终拿到openid
   */
  @Get('wxCode')
  async wxCode(
    @Res() res,
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    const [userId, url] = state.split('@');
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WXPAY_APPID}&secret=${process.env.WXPAY_APPSECRET}&code=${code}&grant_type=authorization_code`,
    );
    const { openid } = response.data;
    await this.studentService.updateById(userId, {
      openid,
    });
    res.redirect(decodeURIComponent(url));
  }
}
