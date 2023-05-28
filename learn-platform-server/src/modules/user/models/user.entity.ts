import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '昵称',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    comment: '描述',
    nullable: true,
  })
  desc: string;

  @Column({
    comment: '电话',
    nullable: true,
  })
  tel: string;

  @Column({
    comment: '密码',
    nullable: true,
  })
  password: string;

  @Column({
    comment: '账号',
    nullable: true,
  })
  account: string;

  @Column({
    comment: '验证码',
    nullable: true,
  })
  code: string;

  @Column({
    comment: 'code过期时间',
    nullable: true,
  })
  codeCreateTimeAt: Date;
}
