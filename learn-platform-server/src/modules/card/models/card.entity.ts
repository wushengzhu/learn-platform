import { CommonEntity } from '@/common/entities/common.entity';
import { Course } from '@/modules/course/models/course.entity';
import { Shop } from '@/modules/shop/models/shop.entity';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum CardTypeEnum {
  TIME = 'time',
  DURATION = 'duration',
}

/**
 * 组件
 */
@Entity('card')
export class Card extends CommonEntity {
  @Column({
    comment: '名称',
    default: '',
  })
  name: string;

  @Column({
    comment: '卡类型',
    default: CardTypeEnum.TIME,
  })
  @IsNotEmpty()
  type: string;

  @Column({
    comment: '上课次数',
    default: 0,
  })
  time: number;

  @Column({
    comment: '有效期',
    default: 0,
  })
  validityDay: number;

  // 关联课程
  @ManyToOne(() => Course, {
    cascade: true,
  })
  course: Course;

  // 关联门店
  @ManyToOne(() => Shop, {
    cascade: true,
  })
  shop: Shop;
}
