import { Shop } from '@/modules/shop/models/shop.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 机构资源
 */
@Entity('shop_image')
export class ShopImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    comment: '地址',
  })
  @IsNotEmpty()
  url: string;

  @Column({
    comment: 'remark',
    nullable: true,
  })
  remark: string;

  @ManyToOne(() => Shop, (shop) => shop.shopFrontImg)
  shopIdForFront: Shop;

  @ManyToOne(() => Shop, (shop) => shop.shopRoomImg)
  shopIdForRoom: Shop;

  @ManyToOne(() => Shop, (shop) => shop.shopOtherImg)
  shopIdForOther: Shop;
}
