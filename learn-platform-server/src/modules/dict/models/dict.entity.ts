import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 组件，创建entity对象名不要出现大写，会出现重复创建表格错误
 */
@Entity('dict')
export class Dict {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '字典名称',
  })
  @IsNotEmpty()
  dictName: string;

  @Column({
    comment: '字典编码',
  })
  @IsNotEmpty()
  dictCode: string;

  @Column({
    comment: '字典父节点',
    nullable: true,
  })
  parentId: string;

  @Column({
    comment: '是否启用',
    nullable: true,
  })
  isCanUse: boolean;

  @Column({
    comment: '模块编码',
    nullable: true,
  })
  modCode: string;
}
