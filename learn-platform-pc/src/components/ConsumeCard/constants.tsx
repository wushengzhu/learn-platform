import { ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space } from "antd";

// 卡
const CARD_TYPE = {
    TIME: "time",
    DURATION: "duration",
};

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
    {
        title: "序号",
        dataIndex: "key",
        width: 50,
        align: "center",
        render: (d, r, index) => index + 1,
    },
    {
        title: "名称",
        dataIndex: "name",
        align: "center",
    },
    {
        title: "有效期（天）",
        dataIndex: "validityDay",
        valueType: "digit",
        width: 130,
        align: "center",
    },
    {
        title: "类型",
        dataIndex: "type",
        valueType: "select",
        width: 150,
        align: "center",
        request: async () => [
            {
                value: CARD_TYPE.TIME,
                label: "次卡",
            },
            {
                value: CARD_TYPE.DURATION,
                label: "时长卡",
            },
        ],
    },
    {
        title: "次数",
        dataIndex: "time",
        valueType: "digit",
        width: 130,
        align: "center",
    },
    {
        title: "操作",
        valueType: "option",
        width: 70,
        align: "center",
        render: (text, record, _, action) => [
            <a
                key="editable"
                type="link"
                onClick={() => {
                    action?.startEditable?.(record?.id || "");
                }}
            >
                编辑
            </a>,
            <Popconfirm
                title="删除"
                description="删除操作不可恢复，确定要删除吗?"
                onConfirm={() => onDeleteHandler(record.id)}
                okText="确认"
                cancelText="取消"
            >
                <a key="delete">删除</a>
            </Popconfirm>,
        ],
    },
];
