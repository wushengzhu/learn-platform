import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    Spin,
} from "antd";
import { useEditTeacherInfo, useTeacher } from "@/services/teacher";
import { useMemo } from "react";

import style from "./index.module.less";
import ImageUpload from "../ImageUpload";

const { TextArea } = Input;

interface IProp {
    id: string;
    onClose: (refetch?: boolean) => void;
}

/**
 * 编辑老师
 */
const TeacherEdit = ({ id, onClose }: IProp) => {
    const [form] = Form.useForm();
    const { data, loading } = useTeacher(id);
    const [handleEdit, editLoading] = useEditTeacherInfo();

    const initValue = useMemo(
        () =>
            data
                ? {
                      ...data,
                      tags: data.tags.split(","),
                      photoUrl: [{ url: data.photoUrl }],
                  }
                : {},
        [data]
    );

    const onSubmitHandler = async () => {
        const values = await form.validateFields();
        if (values) {
            handleEdit(
                id,
                {
                    ...values,
                    tags: values.tags.join(","),
                    photoUrl: values.photoUrl?.[0]?.url,
                },
                onClose
            );
        }
    };

    return (
        <Drawer
            onClose={() => onClose()}
            open
            width="700px"
            title="创建教师"
            footer={
                <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={() => onClose()}>取消</Button>
                    <Button
                        loading={editLoading}
                        onClick={onSubmitHandler}
                        type="primary"
                    >
                        提交
                    </Button>
                </Space>
            }
        >
            <Spin spinning={editLoading || loading}>
                {(data || !id) && (
                    <Form
                        form={form}
                        initialValues={initValue}
                        layout="vertical"
                    >
                        <Form.Item
                            label="头像"
                            name="photoUrl"
                            rules={[{ required: true }]}
                            style={{ textAlign: "center" }}
                        >
                            <ImageUpload />
                        </Form.Item>
                        <Row className={style.row} gutter={20}>
                            <Col span={16}>
                                <Form.Item
                                    label="名称"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="教龄"
                                    name="teacherTime"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className={style.row} gutter={20}>
                            <Col span={11}>
                                <Form.Item
                                    label="标签"
                                    name="tags"
                                    rules={[{ required: true }]}
                                >
                                    <Select mode="tags" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="资历"
                                    name="seniority"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="学历"
                                    name="education"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="获奖经历" name="carryPrize">
                            <TextArea
                                maxLength={200}
                                className={style.textArea}
                                allowClear
                                showCount
                            />
                        </Form.Item>
                        <Form.Item label="职业经验" name="experience">
                            <TextArea
                                maxLength={200}
                                className={style.textArea}
                                allowClear
                                showCount
                            />
                        </Form.Item>
                    </Form>
                )}
            </Spin>
        </Drawer>
    );
};

export default TeacherEdit;
