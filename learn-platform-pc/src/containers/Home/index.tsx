import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { useShop } from "@/services/shop";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, DatePicker, message } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DAY_FORMAT } from '@/utils/constants';
import style from './index.module.less'
import { useAutoCreateSchedule } from "@/services/dashboard";

const { RangePicker } = DatePicker;

const Home = () => {
    useTitle('首页');
    const { store } = useUserContext();
    const { data: shop } = useShop(store.currentShop || '')
    const [range, setRange] = useState<[string, string]>(['', '']);
    const [run, loading] = useAutoCreateSchedule();

    const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));

    if (!shop) {
        return null;
    }

    const startScheduleHandler = () => {
        if (!range[0]) {
            message.error('请选择时间区间');
            return;
        }
        run(...range);
    };

    const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
        if (!days || !days[0] || !days[1]) {
            return;
        }
        setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
    };


    return (
        <div>
            <PageContainer content={shop.address} header={{ title: shop.name }}>
                <Card className={style.container} extra={
                    <span>
                        <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                        <Button
                            loading={loading}
                            type="link"
                            onClick={startScheduleHandler}
                        >
                            开始排课
                        </Button>
                    </span>
                } />
            </PageContainer>
        </div>
    )
}

export default Home;

