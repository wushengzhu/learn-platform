import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { StudentService } from '../student/student.service';
import axios from 'axios';
import { ProductService } from '../product/product.service';
import { WECHAT_PAY_MANAGER } from 'nest-wechatpay-node-v3';
import { IWxpayResult } from './dto/wxpay-result.type';
import WxPay from 'wechatpay-node-v3';
import { CardRecordService } from '../card-record/card-record.service';
import { OrderService } from '../order/order.service';
import { WxorderService } from '../wxorder/wxorder.service';
import { WxorderType } from '../wxorder/dto/wxorder.type';
import { OrderStatus } from '@/common/constants/enum';

@Controller('wx')
export class WxpayController {
  constructor(
    private readonly studentService: StudentService,
    private readonly productService: ProductService,
    private readonly cardRecordService: CardRecordService,
    private readonly wxorderService: WxorderService,
    private readonly orderService: OrderService,
    @Inject(WECHAT_PAY_MANAGER) private wxPay: WxPay,
  ) {}

  /**
   * 微信支付结果通知
   * @param data
   * @returns
   */
  @Post('wxpayResult')
  async wxpayResult(@Body() data: IWxpayResult) {
    const result: WxorderType & {
      payer: {
        openid: string;
      };
      amount: {
        total: number;
        payer_total: number;
        currency: string;
        payer_currency: string;
      };
    } = this.wxPay.decipher_gcm(
      data.resource.ciphertext,
      data.resource.associated_data,
      data.resource.nonce,
      process.env.WXPAY_APIV3KEY,
    );
    const order = await this.orderService.findByOutTradeNo(result.out_trade_no);
    // 现在只考虑支付中和支付成功两个状态
    if (order && order.status === OrderStatus.USERPAYING) {
      let wxOrder = await this.wxorderService.findByTransactionId(
        result.transaction_id,
      );
      if (!wxOrder) {
        wxOrder = await this.wxorderService.create({
          ...result,
          ...result.payer,
          ...result.amount,
          shop: {
            id: order.shop.id,
          },
        });
      }
      if (wxOrder) {
        const product = await this.productService.findById(order.product.id);
        // 给当前用户添加消费卡，消费卡来自于当前商品
        const res = await this.cardRecordService.addCardForStudent(
          order.student.id,
          product.cards.map((item) => item.id),
        );
        if (res) {
          await this.orderService.updateById(order.id, {
            status: result.trade_state,
            // 关联的微信支付信息
            wxOrder: wxOrder,
          });
          // 添加售卖数
          await this.productService.updateById(product.id, {
            buyNumber: product.buyNumber + order.quantity,
            curStock: product.curStock - order.quantity,
          });
        }
        // 如果创建失败，如何容错？
      }
    }
    return {
      code: 'SUCCESS',
      message: '成功',
    };
  }

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
