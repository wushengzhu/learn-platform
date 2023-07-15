import { Shop } from '@/modules/shop/models/shop.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from '@/common/entities/common.entity';

@Entity('teacher')
export class Teacher extends CommonEntity {
  @Column({
    comment: '名称',
  })
  name: string;

  @Column({
    comment: '照片',
    nullable: true,
  })
  photoUrl: string;

  @Column({
    comment: '教龄',
    nullable: true,
  })
  teacherTime: number;

  @Column({
    comment: '学历',
    nullable: true,
  })
  education: string;

  @Column({
    comment: '资历',
    nullable: true,
  })
  seniority: string;

  @Column({
    comment: '职业经验',
    nullable: true,
  })
  experience: string;

  @Column({
    comment: '获奖经历',
    nullable: true,
  })
  carryPrize: string;

  @Column({
    comment: '风格标签，以，隔开',
    nullable: true,
  })
  tags: string;

  @ManyToOne(() => Shop)
  shop: Shop;
}
