import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { USER_REGISTER } from "@/graphql/auth";
import * as md5 from "md5";
import ImageUpload from "@/components/ImageUpload";

interface IValue {
  account: string;
  password: string;
  tel: string;
  avatar?: Array<{
    url: string
  }>;
}

/**
 * 加密方案1：前端md5密码加密
 * 加密方案2：安装bcryptjs @types/bcryptjs
 * const salt = bcryptjs.genSaltSync();
 * const hash = bcryptjs.hashSync("123456", salt);
 * bcryptjs.compareSync("123456", hash)//输入密码与加密后的比较
 * @param param0
 * @returns
 */

const Register = ({ setIsRegistered }: any) => {
  const [rules] = useState({
    account: [
      {
        required: true,
        message: "用户名不能为空",
      },
      {
        pattern: /^[a-z0-9]{6,10}$/,
        message: "只能包含小写字母和数字，长度大于 6，小于 10",
      },
    ],
    tel: [
      {
        required: false,
        message: "请输入正确的手机号",
        pattern: new RegExp(
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          "g"
        ),
      },
    ],
    password: [
      {
        required: true,
        message: "请输入密码！",
      },
      {
        pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
        message: "只能包含小写字母和数字，长度大于 6",
      },
    ],
  });

  const [register] = useMutation(USER_REGISTER);
  const onFinish = async (values: IValue) => {
    const res = await register({
      variables: Object.assign(
        {},
        { ...values },
        { avatar: values?.avatar?values?.avatar[0]?.url:'', password: md5(values.password) }
      ),
    });
    if (res.data.userRegister.code === 200) {
      message.success("注册成功！");
    } else {
      message.error("注册失败！");
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="avatar"
          style={{ textAlign: "center" }}
        >
         <ImageUpload />
        </Form.Item>
        <Form.Item label="账号" name="account" rules={rules.account}>
          <Input />
        </Form.Item>
        <Form.Item label="电话" name="tel" rules={rules.tel}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={rules.password}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-center items-center mb-2">
        有了账号？去
        <Button type="link" onClick={() => setIsRegistered(false)}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default Register;
