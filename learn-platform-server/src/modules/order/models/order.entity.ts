import { CommonEntity } from '@/common/entities/common.entity';
import { Shop } from '@/modules/shop/models/shop.entity';
import { Product } from '@/modules/product/models/product.entity';
import { Student } from '@/modules/student/models/student.entity';
import { Wxorder } from '@/modules/wxorder/models/wxorder.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

/**
 * 商品订单实体
 */
@Entity('order')
export class Order extends CommonEntity {
  @Column({
    comment: '订单号',
    default: '',
  })
  outTradeNo: string;

  @Column({
    comment: '手机号',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: '数量',
    nullable: true,
  })
  quantity: number;

  @Column({
    comment: '总金额',
    nullable: true,
  })
  amount: number;

  @Column({
    comment: '支付状态',
    nullable: true,
  })
  status: string;

  @ManyToOne(() => Shop, {
    cascade: true,
  })
  shop: Shop;

  @ManyToOne(() => Product, {
    cascade: true,
  })
  product: Product;

  @ManyToOne(() => Student, {
    cascade: true,
  })
  student: Student;

  @OneToOne(() => Wxorder, (wxorder) => wxorder.order, { cascade: true })
  wxOrder?: Wxorder;
}
