import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { useShop } from "@/services/shop";
import { Button, Checkbox, DatePicker, Drawer, Form, Input, InputNumber, Radio, Spin, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import ImageUpload from "../ImageUpload";

interface IProp {
  id: string;
  onClose: () => void
}

const ShopEdit = ({ id, onClose }: IProp) => {
  const [form] = Form.useForm();

  const { data, loading: queryLoading } = useShop(id);
  // const [edit, editLoading] = useEditInfo();

  useEffect(() => {
    console.log('')
  }, [])

  return (
    <Drawer width="600" title={id ? '编辑门店' : '新增门店'} placement="right" onClose={onClose} open
      footer={(
        <div className="flex justify-end">
          <Button
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            className="ml-1"
            // loading={editLoading}
            type="primary"
          // onClick={onFinishHandler}
          >
            保存
          </Button>
        </div>
      )}
    >
      <Spin spinning={queryLoading}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          layout="horizontal"
          style={{ maxWidth: '100%' }}
        >
          <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
            <Checkbox>Checkbox</Checkbox>
          </Form.Item>
          <Form.Item label="Radio">
            <Radio.Group>
              <Radio value="apple"> Apple </Radio>
              <Radio value="pear"> Pear </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="TextArea">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
            <ImageUpload />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  )
}

export default ShopEdit;
