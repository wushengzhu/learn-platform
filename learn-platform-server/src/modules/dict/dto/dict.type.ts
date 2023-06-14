import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DictType {
  @Field()
  id: string;

  @Field({
    description: '字典名称',
  })
  dictName: string;

  @Field({
    description: '字典编码',
  })
  dictCode: string;

  @Field({
    description: '模块编码',
  })
  modCode: string;

  @Field({
    description: '父节点',
    nullable: true,
  })
  parentId: string;

  @Field({
    description: '是否启用',
    nullable: true,
  })
  isCanUse: boolean;
}
