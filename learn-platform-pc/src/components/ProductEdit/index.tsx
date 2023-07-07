import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Space,
    Spin,
    TimePicker,
    message,
} from "antd";
import { useMemo, useState } from "react";
import { useEditProduct, useProductInfo } from "@/services/product";
import DictSelect from "../DictSelect";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../ImageUpload";

interface IDrawerParams {
    id: string;
    title?: string;
    width?: string | number;
    onClose: (isReload?: boolean) => void;
}

/**
 * 获取用户信息组件
 */
const ProductEdit = ({ title, id, width, onClose }: IDrawerParams) => {
    const [form] = Form.useForm();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const { data, loading } = useProductInfo(id);
    const [handleEdit, editLoading] = useEditProduct();

    const initValue = useMemo(
        () =>
            data
                ? {
                      ...data,
                      coverUrl: [{ url: data.coverUrl }],
                      bannerUrl: [{ url: data.bannerUrl }],
                  }
                : {},
        [data]
    );

    const handleOk = async () => {
        const values = await form.validateFields();
        const formValue = {
            ...values,
            coverUrl: values.coverUrl[0].url,
            bannerUrl: values.bannerUrl[0].url,
        };

        if (values) {
            await handleEdit(id, formValue);
            onClose(true);
            setIsDrawerOpen(false);
        } else {
            message.error("请根据表单提示进行修改！");
        }
    };
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    return (
        <Drawer
            title={title}
            width={width}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            afterOpenChange={(o) => !o && onClose()}
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
            <Spin spinning={loading}>
                {(data || !id) && (
                    <Form
                        form={form}
                        initialValues={initValue}
                        {...formItemLayout}
                    >
                        <Form.Item
                            style={{ width: "100%" }}
                            label="名称"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Row gutter={20}>
                            <Col sm={12}>
                                <Form.Item
                                    label="商品分类"
                                    name="type"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    rules={[{ required: true }]}
                                >
                                    <DictSelect dictCode="product_category" />
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="库存总额"
                                    name="stock"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col sm={12}>
                                <Form.Item
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    label="原价"
                                    name="originalPrice"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    label="优惠价"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    name="preferentialPrice"
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="每人限购数量"
                            name="limitBuyNumber"
                            rules={[{ required: true }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="商品简介" name="desc">
                            <TextArea
                                rows={4}
                                allowClear
                                showCount
                                maxLength={200}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品封面图"
                            name="coverUrl"
                            rules={[{ required: true }]}
                        >
                            <ImageUpload
                                listType={"picture-card"}
                                imgCropAspect={16 / 9}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品Banner横图"
                            name="bannerUrl"
                            rules={[{ required: true }]}
                        >
                            <ImageUpload
                                listType={"picture-card"}
                                imgCropAspect={16 / 9}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Spin>
        </Drawer>
    );
};

ProductEdit.defaultProps = {
    id: null,
    title: "新增",
    width: 750,
};
export default ProductEdit;
