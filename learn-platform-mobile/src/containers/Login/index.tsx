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
        <div className="w-30">
          <img src={"https://github.githubassets.com/images/modules/logos_page/Octocat.png"} />
        </div>
        <Form
          layout="horizontal"
          onFinish={onFinish}
          footer={(
            <div className="flex justify-center">
              <Button block size="middle" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", border: 0, color: 'white' }}>
                注 册
              </Button>
              <Button block type="submit" color="primary" size="middle" className="left-2">
                登 录
              </Button>
            </div>
          )}
        >
          <Form.Header><span className="form-title">LearnPlatform</span></Form.Header>
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
