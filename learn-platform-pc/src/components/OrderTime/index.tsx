import { Button, Col, Drawer, Row, Space, Tabs } from "antd";
import { useState } from "react";
import {
    DAYS,
    IDay,
    IOrderTime,
    getColumns,
    getMaxKey,
    isWorkDay,
} from "./constants";
import { EditableProTable } from "@ant-design/pro-components";
import { ChromeOutlined, RedoOutlined } from "@ant-design/icons";
import { useOrderTime } from "./hooks";
import _ from "lodash";

interface IDrawerParams {
    id: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}

const OrderTime = ({ title, id, width, onClose }: IDrawerParams) => {
    const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);

    const onTabsChangeHandler = (key: string) => {
        const current = DAYS.find((item) => item.key === key) as IDay;
        setCurrentDay(current);
    };

    const {
        orderTime,
        loading,
        onDeleteHandler,
        onSaveHandler,
        allWeekSyncHandler,
        allWorkDaySyncHandler,
    } = useOrderTime(id, currentDay.key);

    return (
        <Drawer
            title={title}
            width={width}
            open
            forceRender
            onClose={() => onClose()}
        >
            <Tabs type="card" items={DAYS} onChange={onTabsChangeHandler} />
            <EditableProTable<IOrderTime>
                rowKey="key"
                headerTitle={
                    <Space>
                        选择
                        <span className="text-green-500">
                            {currentDay.label}
                        </span>
                        的课开放预约的时间
                    </Space>
                }
                value={orderTime}
                recordCreatorProps={{
                    record: () => ({
                        key: getMaxKey(orderTime) + 1,
                        startTime: "12:00:00",
                        endTime: "00:00:00",
                    }),
                }}
                columns={getColumns(onDeleteHandler)}
                editable={{
                    onSave: async (rowKey, d) => {
                        let newData = [];
                        if (
                            orderTime.findIndex((item) => item.key === rowKey) >
                            -1
                        ) {
                            newData = orderTime?.map((item) =>
                                item.key === rowKey
                                    ? _.omit(d, "index")
                                    : { ...item }
                            );
                        }
                        // omit 创建一个新对象并忽略第二参数属性
                        newData = [...orderTime, _.omit(d, "index")];
                        onSaveHandler(newData);
                    },
                    onDelete: async (key) => {
                        onDeleteHandler(key as number);
                    },
                }}
            />
            <Row gutter={20} style={{ padding: "0 25px" }}>
                <Col span={12}>
                    <Button
                        icon={<RedoOutlined rev={undefined} />}
                        style={{ width: "100%" }}
                        type="primary"
                        disabled={!isWorkDay(currentDay.key)}
                        onClick={allWorkDaySyncHandler}
                    >
                        全工作日同步
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        icon={<ChromeOutlined rev={undefined} />}
                        style={{ width: "100%" }}
                        type="primary"
                        onClick={allWeekSyncHandler}
                        danger
                    >
                        全周同步
                    </Button>
                </Col>
            </Row>
        </Drawer>
    );
};

OrderTime.defaultProps = {
    id: null,
    title: "新增",
    width: 750,
};

export default OrderTime;
