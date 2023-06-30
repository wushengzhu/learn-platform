import { ICourse } from "@/utils/types";
import { ProColumns, TableDropdown } from "@ant-design/pro-components";
import { Button, Space } from "antd";

interface IProps {
    onEditHandler: (id: string) => void;
    onOrderTimeHandler: (id: string) => void;
    onCardHandler: (id: string) => void;
    onDeleteHandler: (id: string) => void;
}

export const getColumns: ({
    onEditHandler,
    onDeleteHandler,
    onOrderTimeHandler,
    onCardHandler,
}: IProps) => ProColumns<ICourse, "text">[] = ({
    onEditHandler,
    onDeleteHandler,
    onOrderTimeHandler,
    onCardHandler,
}) => [
    {
        title: "课程标题",
        dataIndex: "name",
        ellipsis: true,
    },
    {
        title: "限制人数",
        dataIndex: "limitNumber",
        width: 100,
        search: false,
    },
    {
        title: "持续时长",
        dataIndex: "duration",
        width: 100,
        search: false,
    },
    {
        title: "操作",
        valueType: "option",
        dataIndex: "id",
        align: "center",
        width: 120,
        render: (text, entity, _, action) => [
            <Space>
                <Button
                    key="edit"
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => onEditHandler(entity.id)}
                >
                    编辑
                </Button>
                <Button
                    key="delete"
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => onDeleteHandler(entity.id)}
                >
                    删除
                </Button>
            </Space>,
            <TableDropdown
                key="actionGroup"
                onSelect={(key) => {
                    if (key === "order") {
                        onOrderTimeHandler(entity.id);
                    } else if (key === "card") {
                        onCardHandler(entity.id);
                    }
                }}
                menus={[
                    { key: "order", name: "可约时间" },
                    { key: "card", name: "关联消费卡" },
                ]}
            />,
        ],
    },
];
