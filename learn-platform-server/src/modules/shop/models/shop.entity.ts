import { CommonEntity } from '@/common/entities/common.entity';
import { Course } from '@/modules/course/models/course.entity';
import { ShopImage } from '@/modules/shop-image/models/shop-image.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

/**
 * 组件，创建entity对象名不要出现大写，会出现重复创建表格错误
 */
@Entity('shop')
export class Shop extends CommonEntity {
  @Column({
    comment: '营业执照',
  })
  @IsNotEmpty()
  businessLicense: string;

  @Column({
    comment: '法人',
    nullable: true,
  })
  representative: string;

  @Column({
    comment: '法人身份证正面',
    nullable: true,
  })
  // @IsNotEmpty()
  identityCardFrontImg: string;

  @Column({
    comment: '法人身份证反面',
    nullable: true,
  })
  // @IsNotEmpty()
  identityCardBackImg: string;

  @Column({
    type: 'text',
    comment: '标签 以，隔开',
    nullable: true,
  })
  tags: string;

  @Column({
    type: 'text',
    comment: '简介',
    nullable: true,
  })
  description: string;

  @Column({
    comment: '门店名',
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    comment: 'logo',
    nullable: true,
  })
  logo: string;

  @Column({
    comment: '地址',
    nullable: true,
  })
  address: string;

  @Column({
    comment: '经度',
    nullable: true,
  })
  longitude: string;

  @Column({
    comment: '纬度',
    nullable: true,
  })
  latitude: string;

  @Column({
    comment: '电话',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: '成立日期',
    type: 'timestamp',
    nullable: true,
  })
  establishmentDate: Date;

  @OneToMany(() => ShopImage, (shopImage) => shopImage.shopIdForFront, {
    cascade: true,
  })
  shopFrontImg?: ShopImage[];

  @OneToMany(() => ShopImage, (shopImage) => shopImage.shopIdForRoom, {
    cascade: true,
  })
  shopRoomImg?: ShopImage[];

  @OneToMany(() => ShopImage, (shopImage) => shopImage.shopIdForOther, {
    cascade: true,
  })
  shopOtherImg?: ShopImage[];

  @OneToMany(() => Course, (course) => course.shop)
  courses: Course[];

  // @OneToMany(() => Card, (card) => card.shop)
  // cards: Card[];

  // @OneToMany(() => Product, (product) => product.shop)
  // products: Product[];
}
