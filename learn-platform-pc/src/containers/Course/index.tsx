import { useTitle } from "@/hooks/useTitle";
import { ICourse } from "@/utils/types";
import {
    ActionType,
    PageContainer,
    ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { getColumns } from "./constants";
import { useCourses } from "@/services/course";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CourseEdit from "@/components/CourseEdit";
import OrderTime from "@/components/OrderTime";

const Course = () => {
    useTitle("课程管理");
    const actionRef = useRef<ActionType>();
    const [courseId, setCourseId] = useState("");
    const { refetch } = useCourses();
    const [showInfo, setShowInfo] = useState(false);
    const [showOrderTime, setOrderTime] = useState(false);

    const editCourse = (id?: string) => {
        if (id) {
            setCourseId(id);
        } else {
            setCourseId("");
        }
        setShowInfo(true);
    };

    const onCloseHander = (isReload?: boolean) => {
        setShowInfo(false);
        setOrderTime(false);
        if (isReload) {
            actionRef.current?.reload();
        }
    };

    const deleteCourse = async (id: string) => {};

    const onOrderTimeHandler = (id: string) => {
        setOrderTime(true);
        setCourseId(id);
    };

    const onCardHandler = (id: string) => {
        setOrderTime(true);
        setCourseId(id);
    };

    return (
        <PageContainer header={{ title: "当前门店下开设的课程" }}>
            <ProTable<ICourse>
                rowKey="id"
                actionRef={actionRef}
                columns={getColumns({
                    onDeleteHandler: deleteCourse,
                    onEditHandler: editCourse,
                    onOrderTimeHandler,
                    onCardHandler,
                })}
                request={refetch}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE,
                }}
                toolBarRender={() => [
                    <Button
                        key="add"
                        onClick={() => editCourse()}
                        type="primary"
                        icon={<PlusOutlined rev={undefined} />}
                    >
                        新建
                    </Button>,
                ]}
            />
            {showInfo && (
                <CourseEdit
                    id={courseId}
                    title={courseId ? "编辑" : "新增"}
                    onClose={onCloseHander}
                />
            )}
            {showOrderTime && (
                <OrderTime
                    id={courseId}
                    title={"编辑可约时间"}
                    onClose={onCloseHander}
                />
            )}
        </PageContainer>
    );
};

export default Course;
