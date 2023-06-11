import { ShopImageInput } from '@/modules/shop-image/dto/shopImage.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ShopInput {
  @Field({
    description: '名称',
  })
  name: string;

  @Field({
    description: 'logo',
  })
  logo: string;

  @Field({
    description: '手机号',
  })
  tel: string;

  @Field({
    description: 'tags',
    nullable: true,
  })
  tags: string;

  @Field({
    description: 'longitude',
    nullable: true,
  })
  longitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  latitude: string;

  @Field({
    description: 'latitude',
    nullable: true,
  })
  address: string;

  @Field({
    description: '营业执照',
  })
  businessLicense: string;

  @Field({
    description: 'description',
  })
  description: string;

  @Field({
    description: '法人身份证正面',
  })
  identityCardFrontImg: string;

  @Field({
    description: '法人身份证反面',
  })
  identityCardBackImg: string;

  @Field(() => [ShopImageInput], {
    nullable: true,
    description: '机构门面照片',
  })
  shopFrontImg?: ShopImageInput[];

  @Field(() => [ShopImageInput], {
    nullable: true,
    description: '机构环境照片',
  })
  shopRoomImg?: ShopImageInput[];

  @Field(() => [ShopImageInput], {
    nullable: true,
    description: '机构环境照片',
  })
  shopOtherImg?: ShopImageInput[];
}
