import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, message, Row, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { STUDENT_REGISTER } from "@/graphql/auth";
import * as md5 from 'md5'

interface IValue {
  account: string;
  password: string;
  tel: string;
  avatar?: string;
}

const Register = ({ setIsRegistered }: any) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [rules] = useState({
    account: [
      {
        required: true,
        message: '用户名不能为空',
      },
      {
        pattern: /^[a-z0-9]{6,10}$/,
        message: '只能包含小写字母和数字，长度大于 6，小于 10',
      },
    ],
    tel: [
      {
        required: false,
        message: '请输入正确的手机号',
        pattern: new RegExp(
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          'g',
        ),
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码！',
      },
      {
        pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
        message: '只能包含小写字母和数字，长度大于 6',
      },
    ],
  });

  const [register] = useMutation(STUDENT_REGISTER)
  const onFinish = async (values: IValue) => {
    const res = await register({
      variables: Object.assign({}, { ...values }, { avatar: imageUrl, password: md5(values.password) })
    })
    if (res.data.studentRegister.code === 200) {
      message.success('注册成功！');
    } else {
      message.error('注册失败！')
    }
  }

  const onFinishFailed = () => {

  }

  const beforeUpload = async (file: File) => {
    return true
  }

  const props: UploadProps = {
    beforeUpload: beforeUpload,
    customRequest: () => {

    },
    maxCount: 1,
    listType: 'picture-circle',
    showUploadList: false
  };


  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="avatar"
          rules={[]}
          style={{ textAlign: "center" }}
        >
          <Upload
            {...props}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          label="账号"
          name="account"
          rules={rules.account}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="电话"
          name="tel"
          rules={rules.tel}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={rules.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-center items-center mb-2">
        有了账号？去<Button type="link" onClick={() => setIsRegistered(false)}>登录</Button>
      </div>
    </div>
  )
}

export default Register;
