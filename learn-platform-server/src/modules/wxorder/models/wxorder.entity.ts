import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entity';
import { Shop } from '@/modules/shop/models/shop.entity';
import { Order } from '@/modules/order/models/order.entity';

/**
 * 微信订单信息
 */
@Entity('wxorder')
export class Wxorder extends CommonEntity {
  @Column({
    comment: '微信公众号ID',
  })
  appid: string;

  @Column({
    comment: '商户号',
  })
  mchid: string;

  @Column({
    comment: 'openid',
    nullable: true,
  })
  openid: string;

  @Column({
    comment: '交易类型',
    nullable: true,
  })
  trade_type: string;

  @Column({
    comment: '交易状态',
    nullable: true,
  })
  trade_state: string;

  @Column({
    comment: '银行',
    nullable: true,
  })
  bank_type: string;

  @Column({
    comment: '微信支付订单号',
    nullable: true,
  })
  transaction_id: string;

  @Column({
    comment: '商户订单号',
    nullable: true,
  })
  out_trade_no: string;

  @Column({
    comment: '附加数据',
    nullable: true,
  })
  attach: string;

  @Column({
    comment: '交易状态描述',
    nullable: true,
  })
  trade_state_desc: string;

  @Column({
    comment: '支付完成时间',
    nullable: true,
  })
  success_time: string;

  @Column({
    comment: '订单总金额，单位为分',
    nullable: true,
  })
  total: number;

  @Column({
    comment: '用户支付金额，单位为分',
    nullable: true,
  })
  payer_total: number;

  @Column({
    comment: 'CNY：人民币，境内商户号仅支持人民币',
    nullable: true,
  })
  currency: string;

  @Column({
    comment: '用户支付币种，示例值：CNY',
    nullable: true,
  })
  payer_currency: string;

  @ManyToOne(() => Shop, { cascade: true })
  shop?: Shop;

  @OneToOne(() => Order, (order) => order.wxOrder)
  order?: Order;
}
