// 商品状态
export enum ProductStatus {
  LIST = 'LIST', // 上架
  UN_LIST = 'UN_LIST', // 下架
}

export enum OrderStatus {
  SUCCESS = 'SUCCESS', //支付成功
  REFUND = 'REFUND', //转入退款
  NOTPAY = 'NOTPAY', //未支付
  CLOSED = 'CLOSED', //已关闭
  REVOKED = 'REVOKED', //已撤销（付款码支付）
  USERPAYING = 'USERPAYING', //用户支付中（付款码支付）
  PAYERROR = 'PAYERROR', //支付失败(其他原因，如银行返回失败)
}

// 消费卡类型
export enum CardType {
  TIME = 'time',
  DURATION = 'duration',
}
// 消费卡状态
export enum CardStatus {
  VALID = 'VALID', // 有效
  EXPIRED = 'EXPIRED', // 过期
  DEPLETE = 'DEPLETE', // 耗尽了
}

// 课程表状态
export enum ScheduleStatus {
  NO_DO = 'NO_DO', // 未开始
  DOING = 'DOING', // 正在上课中
  FINISH = 'FINISH', // 上完课了
  COMMENTED = 'COMMENTED', // 已评价
  CANCEL = 'CANCEL', // 已取消
}
