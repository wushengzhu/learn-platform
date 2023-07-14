import { Field, ObjectType } from '@nestjs/graphql';

// appId: 'wx2421b1c4370ec43b', // 公众号ID，由商户传入
// timeStamp: new Date().getMilliseconds(), // 时间戳，自1970年以来的秒数
// nonceStr: 'e61463f8efa94090b1f366cccfbbb444', // 随机串
// package: 'prepay_id=u802345jgfjsdfgsdg888',
// signType: 'MD5', // 微信签名方式：
// paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89', // 微信签名
@ObjectType()
export class WxConfig {
  @Field({
    description: '公众号ID',
  })
  appId: string;

  @Field({
    description: '时间戳，自1970年以来的秒数',
  })
  timeStamp: string;

  @Field({
    description: '随机串',
  })
  nonceStr: string;

  @Field({
    description: '参数包',
  })
  package: string;

  @Field({
    description: '微信签名方式',
  })
  signType: string;

  @Field({
    description: '微信签名',
  })
  paySign: string;
}
