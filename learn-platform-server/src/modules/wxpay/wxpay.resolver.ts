import { StudentService } from './../student/student.service';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { GqlAuthGuard } from '@/common/guards/auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WxConfigResult } from './dto/result-wxpay.output';
import {
  NOT_OPENID,
  ORDER_LIMIT,
  PRODUCT_NOT_EXIST,
  STACK_NOT_ENOUGH,
  SUCCESS,
} from '@/common/constants/code';
import WxPay from 'wechatpay-node-v3';
import { WECHAT_PAY_MANAGER } from 'nest-wechatpay-node-v3';
import { v4 as uuidv4 } from 'uuid';
import { ProductService } from '../product/product.service';
import { WxConfig } from './dto/wx-config.type';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '@/common/constants/enum';
import { Result } from '@/common/dto/result.type';
import { CardRecordService } from '../cardRecord/card-record.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class WxpayResolver {
  constructor(
    private readonly cardRecordService: CardRecordService,
    private readonly studentService: StudentService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    @Inject(WECHAT_PAY_MANAGER) private wxPay: WxPay,
  ) {}

  // appId: 'wx2421b1c4370ec43b', // 公众号ID，由商户传入
  // timeStamp: '1395712654', // 时间戳，自1970年以来的秒数
  // nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 随机串
  // package: 'prepay_id=up_wx21201855730335ac86f8c43d1889123400',
  // signType: 'RSA', // 微信签名方式：
  // paySign: 'oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==', // 微信签名
  @Mutation(() => WxConfigResult)
  async getWxpayConfig(
    @CurUserId() userId,
    @Args('productId') productId: string,
    @Args('quantity') quantity: number, // 数量
    @Args('amount') amount: number, // 以分为单位
  ): Promise<WxConfigResult> {
    const student = await this.studentService.findById(userId);
    const product = await this.productService.findById(productId);
    const orders = await this.orderService.findByStudentAndProduct(
      userId,
      productId,
      product.shop.id,
    );

    // 商品限购
    if (orders.length + quantity > product.limitBuyNumber) {
      return {
        code: ORDER_LIMIT,
        message: `一个用户只能购买 ${product.limitBuyNumber} 个商品, 您已超过限购数量。`,
      };
    }

    // 库存不足
    if (product.curStock - quantity < 0) {
      return {
        code: STACK_NOT_ENOUGH,
        message: '库存不足',
      };
    }

    if (!product) {
      return {
        code: PRODUCT_NOT_EXIST,
        message: '没有找到对应的商品',
      };
    }

    if (!student || !student.openid) {
      return {
        code: NOT_OPENID,
        message: '没有找到 OPENID',
      };
    }

    const outTradeNo = uuidv4().replace(/-/g, '');
    const params = {
      description: product.name,
      out_trade_no: outTradeNo,
      notify_url: process.env.WXPAY_URL + '/wx/wxpayResult',
      amount: {
        total: amount,
      },
      payer: {
        openid: student.openid,
      },
    };
    const result = await this.wxPay.transactions_jsapi(params);
    await this.orderService.create({
      tel: student.tel,
      quantity,
      amount,
      outTradeNo,
      product: {
        id: productId,
      },
      shop: {
        id: product.shop.id,
      },
      student: {
        id: userId,
      },
      status: OrderStatus.USERPAYING,
    });
    return {
      code: SUCCESS,
      data: result as WxConfig,
      message: '获取微信支付配置信息成功',
    };
  }

  @Mutation(() => Result)
  async mockOrderGenerator(
    @CurUserId() userId: string,
    @Args('productId') productId: string,
    @Args('quantity') quantity: number, // 数量
    @Args('amount') amount: number, // 以分为单位
  ): Promise<Result> {
    const student = await this.studentService.findById(userId);
    const product = await this.productService.findById(productId);
    const orders = await this.orderService.findByStudentAndProduct(
      userId,
      productId,
      product.shop.id,
    );

    // 商品限购
    if (orders.length + quantity > product.limitBuyNumber) {
      return {
        code: ORDER_LIMIT,
        message: `一个用户只能购买 ${product.limitBuyNumber} 个商品, 您已超过限购数量。`,
      };
    }

    // 库存不足
    if (product.curStock - quantity < 0) {
      return {
        code: STACK_NOT_ENOUGH,
        message: '库存不足',
      };
    }

    const outTradeNo = uuidv4().replace(/-/g, '');
    await this.orderService.create({
      tel: student.tel,
      outTradeNo,
      quantity,
      amount,
      product: {
        id: productId,
      },
      shop: {
        id: product.shop.id,
      },
      student: {
        id: userId,
      },
      status: OrderStatus.SUCCESS,
      wxOrder: {
        mchid: '322323233',
        appid: 'wx3232332323332',
        out_trade_no: outTradeNo,
        transaction_id: 'transaction' + outTradeNo,
        trade_type: 'JSAPI',
        trade_state: 'SUCCESS',
        trade_state_desc: '支付成功',
        bank_type: 'OTHERS',
        attach: '',
        success_time: '2023-05-23T00:48:25+08:00',
        openid: 'wewewewewewewewewewewewewewe',
        total: amount,
        payer_total: amount,
        currency: 'CNY',
        payer_currency: 'CNY',
        shop: {
          id: product.shop.id,
        },
      },
    });
    // 给当前用户添加消费卡，消费卡来自于当前商品
    await this.cardRecordService.addCardForStudent(
      userId,
      product.cards.map((item) => item.id),
    );

    // 添加售卖数
    await this.productService.updateById(product.id, {
      buyNumber: product.buyNumber + quantity,
      curStock: product.curStock - quantity,
    });
    return {
      code: SUCCESS,
      message: '购买成功',
    };
  }
}
