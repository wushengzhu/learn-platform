import { CommonEntity } from '@/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('card_record')
export class CardRecord extends CommonEntity {
  @Column({
    comment: '昵称',
    default: '',
  })
  name: string;
}
