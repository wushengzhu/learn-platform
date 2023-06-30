import { useTitle } from "@/hooks/useTitle";
import { Button, Col, Drawer, Row, Space, Tabs } from "antd";
import { useState } from "react";
import { DAYS, IDay, IOrderTime, getColumns } from "./constants";
import { EditableProTable } from "@ant-design/pro-components";
import { ChromeOutlined, RedoOutlined } from "@ant-design/icons";

interface IDrawerParams {
    id?: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}

const OrderTime = ({ title, id, width, onClose }: IDrawerParams) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
    const handleOk = async () => {};
    const onTabsChangeHandler = (key: string) => {
        const current = DAYS.find((item) => item.key === key) as IDay;
        setCurrentDay(current);
    };
    const onDeleteHandler = (id: string) => {};

    return (
        <Drawer
            title={title}
            width={width}
            open={isDrawerOpen}
            forceRender
            onClose={() => onClose()}
            footer={
                <Space className="flex justify-end">
                    <Button onClick={() => onClose()}>取消</Button>
                    <Button onClick={handleOk} type="primary">
                        保存
                    </Button>
                </Space>
            }
        >
            <Tabs type="card" items={DAYS} onChange={onTabsChangeHandler} />
            <EditableProTable
                rowKey="key"
                recordCreatorProps={{
                    record: (index: number) => ({
                        key: index + 1,
                        startTime: "12:00:00",
                        endTime: "00:00:00",
                    }),
                }}
                columns={getColumns(onDeleteHandler)}
            />
            <Row gutter={20} style={{ padding: "0 25px" }}>
                <Col span={12}>
                    <Button
                        icon={<RedoOutlined rev={undefined} />}
                        style={{ width: "100%" }}
                        type="primary"
                    >
                        全工作日同步
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        icon={<ChromeOutlined rev={undefined} />}
                        style={{ width: "100%" }}
                        type="primary"
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
