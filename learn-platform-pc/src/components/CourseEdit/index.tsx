import {
    Button,
    Col,
    Drawer,
    Form,
    InputNumber,
    Modal,
    Row,
    Space,
    Spin,
    TimePicker,
    message,
} from "antd";
import {
    ProForm,
    ProFormInstance,
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { useCourse, useEditCourse } from "@/services/course";
import ImageUpload from "../ImageUpload";
import TeacherSelect from "../TeacherSelect";
import { ITeacher, IValue } from "@/utils/types";

interface IDrawerParams {
    id?: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}

/**
 * 获取用户信息组件
 */
const CourseEdit = ({ title, id, width, onClose }: IDrawerParams) => {
    const formRef = useRef<ProFormInstance>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [handleEdit, editLoading] = useEditCourse();
    const { getCourse, loading } = useCourse();
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    useEffect(() => {
        const init = async () => {
            if (id) {
                const res = await getCourse(id);
                formRef.current?.setFieldsValue({
                    ...res,
                    teachers: res.teachers ? res.teachers.map((item: ITeacher) => ({ label: item.name, value: item.id })) : [],
                    coverUrl: res?.coverUrl ? [{ url: res.coverUrl }] : []
                });
            } else {
                formRef.current?.resetFields();
            }
        };
        init();
    }, [id]);

    const handleOk = async () => {
        const values =
            await formRef.current?.validateFieldsReturnFormatValue?.();
        if (values) {
            const params =
            {
                ...values,
                teachers: values.teachers ? values?.teachers?.map((item: IValue) => item.value) : '',
                coverUrl: values.coverUrl[0].url
            }
            await handleEdit(id, params);
            setIsDrawerOpen(false);
            onClose(true);
        } else {
            message.error("请根据表单提示进行修改！");
        }
    };

    const rules = {
        name: [
            {
                required: true,
                message: "请填写",
            },
        ],
        limitNumber: [
            {
                required: true,
                message: "请填写",
            },
        ],
        group: [
            {
                required: true,
                message: "请填写",
            },
        ],
        baseAbility: [
            {
                required: true,
                message: "请填写",
            },
        ],
        duration: [
            {
                required: true,
                message: "请填写",
            },
        ],
    };

    return (
        <Drawer
            title={title}
            width={width}
            open={isDrawerOpen}
            onClose={() => onClose()}
            footer={
                <Space className="flex justify-end">
                    <Button onClick={() => onClose()}>取消</Button>
                    <Button
                        loading={editLoading}
                        onClick={handleOk}
                        type="primary"
                    >
                        保存
                    </Button>
                </Space>
            }
        >
            <ProForm
                formRef={formRef}
                {...formItemLayout}
                layout="horizontal"
                submitter={false}
                loading={loading}
            >
                <Form.Item
                    name="coverUrl"
                    label="封面图："
                    rules={[{ required: true, message: '请上传' }]}
                >
                    <ImageUpload listType={"picture-card"} maxCount={1} />
                </Form.Item>
                <ProFormText
                    width="xl"
                    name="name"
                    label="课程名称"
                    placeholder="课程名称"
                    rules={rules.name}
                />
                <Form.Item
                    name="teachers"
                    label="任课老师："
                    rules={[{ required: true, message: '请上传' }]}
                >
                    <TeacherSelect />
                </Form.Item>
                <ProFormTextArea
                    name="desc"
                    width="xl"
                    label="课程描述"
                    placeholder="课程描述"
                    fieldProps={{
                        showCount: true,
                        maxLength: 200,
                    }}
                />
                <ProFormText
                    width="xl"
                    name="group"
                    label="适龄人群"
                    rules={rules.group}
                    placeholder="适龄人群"
                />
                <ProFormRadio.Group
                    label="适合基础"
                    name="baseAbility"
                    initialValue="入门"
                    rules={rules.baseAbility}
                    options={["入门", "初级", "中级", "高级"]}
                />
                <Form.Item
                    name="limitNumber"
                    label="限制人数："
                    rules={rules.limitNumber}
                >
                    <InputNumber min={0} addonAfter={"人"} />
                </Form.Item>
                <Form.Item
                    name="duration"
                    label="持续时间："
                    rules={rules.name}
                >
                    <InputNumber min={0} addonAfter={"h"} />
                </Form.Item>
                <ProFormTextArea
                    name="reserveInfo"
                    width="xl"
                    label="预约信息"
                    placeholder="预约信息"
                    fieldProps={{
                        showCount: true,
                        maxLength: 200,
                    }}
                />
                <ProFormTextArea
                    name="refundInfo"
                    width="xl"
                    label="退款信息"
                    placeholder="退款信息"
                    fieldProps={{
                        showCount: true,
                        maxLength: 200,
                    }}
                />
                <ProFormTextArea
                    name="otherInfo"
                    width="xl"
                    label="其他说明信息"
                    placeholder="其他说明信息"
                    fieldProps={{
                        showCount: true,
                        maxLength: 200,
                    }}
                />
            </ProForm>
        </Drawer>
    );
};

CourseEdit.defaultProps = {
    id: null,
    title: "新增",
    width: 750,
};
export default CourseEdit;
