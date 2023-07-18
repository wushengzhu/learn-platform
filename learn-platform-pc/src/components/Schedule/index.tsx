import { useSchedules } from "@/services/dashboard";
import { Avatar, Descriptions, Result, Spin, Steps } from "antd";

interface IProps {
    day: string;
}
/**
 * 某一天的课程表
 * @returns
 */
const Schedule = ({ day }: IProps) => {
    const { data, loading } = useSchedules(day);
    if (data?.length === 0) {
        return <Result status="warning" title="当前没有排课，快去排课吧" />;
    }
    return (
        <Spin spinning={loading}>
            <Steps
                direction="vertical"
                items={data?.map((item) => ({
                    title: `${item.startTime}-${item.endTime} ${item.course}`,
                    description: (
                        <Descriptions>
                            <Descriptions.Item span={3} label="讲师">
                                {item.course.teachers.map((t) => (
                                    <span>
                                        <Avatar
                                            shape="square"
                                            size="small"
                                            src={t.photoUrl}
                                        />
                                        {t.name}
                                    </span>
                                ))}
                            </Descriptions.Item>
                        </Descriptions>
                    ),
                }))}
            />
        </Spin>
    );
};

export default Schedule;
