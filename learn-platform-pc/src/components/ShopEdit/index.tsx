import { useEditInfo, useShop } from "@/services/shop";
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Spin,
    UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useState } from "react";
import ImageUpload from "../ImageUpload";
import { IShop } from "@/utils/types";
import dayjs from "dayjs";
import BaiduMap from "../BaiduMap";

interface IProp {
    id: string;
    onClose: () => void;
}

const ShopEdit = ({ id, onClose }: IProp) => {
    const [form] = Form.useForm();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [lng, setLng] = useState(116.402544);
    const [lat, setLat] = useState(39.928216);
    const { data, loading: queryLoading } = useShop(id);
    const [edit, editLoading] = useEditInfo();
    const initValue = useMemo(
        () =>
            data
                ? {
                      ...data,
                      tags: data.tags?.split(","),
                      logo: [{ url: data.logo }],
                      establishmentDate: dayjs(
                          data?.establishmentDate,
                          "YYYY-MM-DD"
                      ),
                      identityCardBackImg: [{ url: data.identityCardBackImg }],
                      identityCardFrontImg: [
                          { url: data.identityCardFrontImg },
                      ],
                      businessLicense: [{ url: data.businessLicense }],
                  }
                : {},
        [data]
    );

    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 16 },
    };

    const onFinishHandler = async () => {
        const values = await form.validateFields();
        if (values) {
            const formData = {
                ...values,
                logo: values.logo[0].url,
                tags: values?.tags?.join(","),
                identityCardBackImg: values?.identityCardBackImg
                    ? values?.identityCardBackImg[0].url
                    : "",
                identityCardFrontImg: values?.identityCardFrontImg
                    ? values?.identityCardFrontImg[0].url
                    : "",
                businessLicense: values.businessLicense
                    ? values.businessLicense[0].url
                    : "",
                shopFrontImg:
                    values?.orgFrontImg?.map((item: UploadFile) => ({
                        url: item.url,
                    })) || [],
                shopRoomImg:
                    values?.orgRoomImg?.map((item: UploadFile) => ({
                        url: item.url,
                    })) || [],
                shopOtherImg:
                    values?.orgOtherImg?.map((item: UploadFile) => ({
                        url: item.url,
                    })) || [],
            } as IShop;
            edit(id, formData);
            onClose();
        }
    };

    const rules = {
        name: [
            {
                required: true,
                message: "请填写",
            },
        ],
        logo: [
            {
                required: true,
                message: "请上传",
            },
        ],
        businessLicense: [
            {
                required: true,
                message: "请上传",
            },
        ],
        address: [
            // {
            //   len: 50,
            //   message: '不能超过50个字符',
            // },
            {
                required: true,
                message: "请填写",
            },
        ],
        establishmentDate: [
            {
                required: true,
                message: "请填写",
            },
        ],
    };

    const onChangeMap = (map: any) => {
        console.log(map);
        const { lng, lat } = map.latlng || { lng: 116.402544, lat: 39.928216 };
        form.setFieldsValue({
            longitude: lng,
            latitude: lat,
        });
        setLng(lng);
        setLat(lat);
    };

    if (queryLoading) {
        return <Spin />;
    }

    return (
        <Drawer
            width={700}
            title={id ? "编辑门店" : "新增门店"}
            placement="right"
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            afterOpenChange={(o) => !o && onClose()}
            footer={
                <div className="flex justify-end">
                    <Button onClick={onClose}>取消</Button>
                    <Button
                        className="ml-1"
                        loading={editLoading}
                        type="primary"
                        onClick={onFinishHandler}
                    >
                        保存
                    </Button>
                </div>
            }
        >
            <Spin spinning={queryLoading}>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    initialValues={initValue}
                    style={{ maxWidth: "100%" }}
                >
                    <Form.Item
                        name="name"
                        label="门店名"
                        hasFeedback
                        rules={rules.name}
                    >
                        <Input />
                    </Form.Item>
                    <Row gutter={20}>
                        <Col sm={10}>
                            <Form.Item
                                name="businessLicense"
                                {...formItemLayout}
                                label="营业执照"
                                rules={rules.businessLicense}
                            >
                                <ImageUpload listType={"picture-card"} />
                            </Form.Item>
                        </Col>
                        <Col sm={10}>
                            <Form.Item
                                name="logo"
                                {...formItemLayout}
                                label="Logo"
                                rules={rules.logo}
                            >
                                <ImageUpload listType={"picture-card"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="address"
                        label="门店地址"
                        hasFeedback
                        rules={rules.address}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="establishmentDate"
                        label="成立日期"
                        hasFeedback
                        rules={rules.establishmentDate}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="description" label="门店简介">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="标签" name="tags">
                        <Select
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="请输入标签"
                        />
                    </Form.Item>
                    <Row gutter={20}>
                        <Col sm={10}>
                            <Form.Item
                                {...formItemLayout}
                                name="representative"
                                label="法定代表人"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={10}>
                            <Form.Item
                                {...formItemLayout}
                                name="tel"
                                label="电话"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col sm={10}>
                            <Form.Item
                                name="identityCardFrontImg"
                                {...formItemLayout}
                                label="身份证正面"
                            >
                                <ImageUpload listType={"picture-card"} />
                            </Form.Item>
                        </Col>
                        <Col sm={10}>
                            <Form.Item
                                name="identityCardBackImg"
                                {...formItemLayout}
                                label="身份证反面"
                            >
                                <ImageUpload listType={"picture-card"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="地图">
                        <BaiduMap onChange={onChangeMap} lng={lng} lat={lat} />
                    </Form.Item>
                    <Row gutter={20}>
                        <Col sm={10}>
                            <Form.Item
                                name="longitude"
                                {...formItemLayout}
                                label="经度"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={10}>
                            <Form.Item
                                name="latitude"
                                {...formItemLayout}
                                label="纬度"
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider>
                        门店顶部图：图片长宽要求比例为 2:1，最多上传 5 张{" "}
                    </Divider>
                    <Form.Item name="shopFrontImg">
                        <ImageUpload
                            maxCount={5}
                            imgCropAspect={2 / 1}
                            listType={"picture-card"}
                        />
                    </Form.Item>
                    <Divider>
                        门店室内图：图片长宽要求比例为 2:1，最多上传 5 张{" "}
                    </Divider>
                    <Form.Item name="shopRoomImg">
                        <ImageUpload
                            maxCount={5}
                            imgCropAspect={2 / 1}
                            listType={"picture-card"}
                        />
                    </Form.Item>
                    <Divider>
                        门店其他图：图片长宽要求比例为 2:1，最多上传 5 张{" "}
                    </Divider>
                    <Form.Item name="shopOtherImg">
                        <ImageUpload
                            maxCount={5}
                            imgCropAspect={2 / 1}
                            listType={"picture-card"}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default ShopEdit;
