import { CommonType } from '@/common/dto/common.type';
import { ShopImageType } from '@/modules/shop-image/dto/shopImage.output';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 学员
 */
@ObjectType()
export class ShopType extends CommonType {
  @Field({
    description: '营业执照',
  })
  businessLicense: string;

  @Field({
    description: '法人身份证正面',
  })
  identityCardFrontImg: string;

  @Field({
    description: '法人身份证反面',
  })
  identityCardBackImg: string;

  @Field({
    description: '标签 以，隔开',
    nullable: true,
  })
  tags: string;

  @Field({
    description: '简介',
    nullable: true,
  })
  description: string;

  @Field({
    description: '机构名',
    nullable: true,
  })
  name: string;

  @Field({
    description: 'logo',
    nullable: true,
  })
  logo: string;

  @Field({
    description: '经度',
    nullable: true,
  })
  longitude: string;

  @Field({
    description: '纬度',
    nullable: true,
  })
  latitude: string;

  @Field({
    description: '地址',
    nullable: true,
  })
  address?: string;

  @Field({
    description: '电话',
    nullable: true,
  })
  tel: string;

  @Field(() => [ShopImageType], { nullable: true, description: '封面图' })
  shopFrontImg?: ShopImageType[];

  @Field(() => [ShopImageType], { nullable: true, description: '室内图' })
  shopRoomImg?: ShopImageType[];

  @Field(() => [ShopImageType], { nullable: true, description: '其他图' })
  shopOtherImg?: ShopImageType[];
}
