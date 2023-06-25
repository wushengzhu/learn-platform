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

const Course = () => {
  useTitle("课程管理");
  const actionRef = useRef<ActionType>();
  const [courseId, setCourseId] = useState("");
  const { refetch } = useCourses();
  const [showInfo, setShowInfo] = useState(false);

  const editCourse = (id?: string) => {
    if (id) {
      setCourseId(id);
    } else {
      setCourseId("");
    }
    setShowInfo(true);
  };

  const onOrderTimeHandler = (id: string) => {};

  const onCardHandler = (id: string) => {};

  return (
    <PageContainer header={{ title: "当前门店下开设的课程" }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
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
    </PageContainer>
  );
};

export default Course;
