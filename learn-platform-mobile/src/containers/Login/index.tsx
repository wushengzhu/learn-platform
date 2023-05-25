import React, { RefObject, useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd-mobile';
import './index.less';

export default () => {
  const onFinish = (values: any) => {

  };

  const [rules] = useState({
    username: [
      {
        required: true,
        message: '请输入账号!',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码！',
      },
    ]
  });

  return (
    <>
      <div className="login-container">
        <Form
          layout="horizontal"
          onFinish={onFinish}
          footer={(
            <Button block type="submit" color="primary" size="large">
              提交
            </Button>
          )}
        >
          <Form.Header>LearnPlatform</Form.Header>
          <Form.Item
            name="account"
            rules={rules.username}
            className="form-item"
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="password" rules={rules.password} className="form-item mt-2">
            <Input placeholder="请输入密码" clearable type="password" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
