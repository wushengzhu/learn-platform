import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { useShop } from "@/services/shop";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Calendar, Card, Col, DatePicker, Row, message } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DAY_FORMAT } from "@/utils/constants";
import style from "./index.module.less";
import { useAutoCreateSchedule, useSchedules } from "@/services/dashboard";
import Schedule from "@/components/Schedule";
import { Util } from "@/utils/util";
import ResultTip from "@/components/ResultTip";

const { RangePicker } = DatePicker;

const Home = () => {
    useTitle("首页");
    const { store } = useUserContext();
    const { data: shop } = useShop(store.currentShop || "");
    const [range, setRange] = useState<[string, string]>(["", ""]);
    const [run, loading] = useAutoCreateSchedule();

    const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));
    const { data } = useSchedules(day);

    if (!shop) {
        return null;
    }

    const startScheduleHandler = () => {
        if (!range[0]) {
            message.error("请选择时间区间");
            return;
        }
        run(...range);
    };

    const onRangeChangeHandler = (
        days: [Dayjs | null, Dayjs | null] | null
    ) => {
        if (!days || !days[0] || !days[1]) {
            return;
        }
        setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
    };

    return (
        <div>
            {Util.isNullOrWhiteSpace(store.currentShop) && (
                <ResultTip
                    status={"warning"}
                    title={"暂时没有排课信息，请选择门店"}
                    extraArea={undefined}
                />
            )}
            {!Util.isNullOrWhiteSpace(store.currentShop) && (
                <PageContainer
                    content={shop.address}
                    header={{ title: shop.name }}
                >
                    <Row gutter={20}>
                        <Col flex="auto">
                            <Card
                                title={`${day}的课程`}
                                className={style.container}
                                extra={
                                    <span>
                                        <RangePicker
                                            onChange={(days) =>
                                                onRangeChangeHandler(days)
                                            }
                                        />
                                        <Button
                                            loading={loading}
                                            type="link"
                                            onClick={startScheduleHandler}
                                        >
                                            开始排课
                                        </Button>
                                    </span>
                                }
                            />
                            <Schedule day={day} />
                        </Col>
                        <Col flex="360px">
                            <Calendar
                                fullscreen={false}
                                onChange={(d) => setDay(d.format(DAY_FORMAT))}
                            />
                        </Col>
                    </Row>
                </PageContainer>
            )}
        </div>
    );
};

export default Home;
