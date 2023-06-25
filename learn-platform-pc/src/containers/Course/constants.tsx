import { ICourse } from "@/utils/types";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";

interface IProps {
    onEditHandler: (id: string) => void
    onOrderTimeHandler: (id: string) => void
    onCardHandler: (id: string) => void
  }
  
  export const getColumns: ({
    onEditHandler,
    onOrderTimeHandler,
    onCardHandler,
  }: IProps) => ProColumns<ICourse, 'text'>[] = ({
    onEditHandler,
    onOrderTimeHandler,
    onCardHandler,
  }) => [
    {
      title: '课程标题',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '限制人数',
      dataIndex: 'limitNumber',
      width: 100,
      search: false,
    },
    {
      title: '持续时长',
      dataIndex: 'duration',
      width: 100,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      align: 'center',
      width: 120,
      render: (text, entity) => (
        <Space>
          <Button
            key="edit"
            type="link"
            onClick={() => onEditHandler(entity.id)}
          >
            编辑
          </Button>
          <Button
            key="orderTime"
            type="link"
            onClick={() => onOrderTimeHandler(entity.id)}
          >
            可约时间
          </Button>
          <Button
            key="card"
            type="link"
            onClick={() => onCardHandler(entity.id)}
          >
            关联消费卡
          </Button>
        </Space>
      ),
    },
  ];