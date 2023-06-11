import { CommonEntity } from '@/common/entities/common.entity';
import { ShopImage } from '@/modules/shop-image/models/shop-image.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件
 */
@Entity('Shop')
export class Shop extends CommonEntity {
  @Column({
    comment: '营业执照',
  })
  @IsNotEmpty()
  businessLicense: string;

  @Column({
    comment: '法人身份证正面',
  })
  @IsNotEmpty()
  identityCardFrontImg: string;

  @Column({
    comment: '法人身份证反面',
  })
  @IsNotEmpty()
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
    comment: '机构名',
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

  // @OneToMany(() => Course, (course) => course.shop)
  // courses: Course[];

  // @OneToMany(() => Card, (card) => card.shop)
  // cards: Card[];

  // @OneToMany(() => Product, (product) => product.shop)
  // products: Product[];
}
