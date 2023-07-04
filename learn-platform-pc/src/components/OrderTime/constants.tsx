import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space } from "antd";

type TWeek =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export interface IDay {
    key: TWeek;
    label: string;
}

export const DAYS: IDay[] = [
    {
        key: "monday",
        label: "周一",
    },
    {
        key: "tuesday",
        label: "周二",
    },
    {
        key: "wednesday",
        label: "周三",
    },
    {
        key: "thursday",
        label: "周四",
    },
    {
        key: "friday",
        label: "周五",
    },
    {
        key: "saturday",
        label: "周六",
    },
    {
        key: "sunday",
        label: "周日",
    },
];

export const isWorkDay = (day: string) =>
    ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(day);

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
    const keys = orderTime?.map((item) => item.key) || [];

    if (keys.length === 0) {
        return 0;
    }
    return Math.max(...keys);
};

export interface IOrderTime {
    startTime: string;
    endTime: string;
    key: number;
}

export interface IWeekCourse {
    week: TWeek;
    orderTime: IOrderTime[];
}

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
    {
        title: "序号",
        dataIndex: "key",
        width: 50,
        align: "center",
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        valueType: "time",
        width: 120,
        align: "center",
    },
    {
        title: "结束时间",
        dataIndex: "endTime",
        valueType: "time",
        width: 120,
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
                    action?.startEditable?.(record?.key || "");
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
