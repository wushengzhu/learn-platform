import React, { RefObject, useState } from 'react';
import { Form, Input, Button, Space } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import styles from './index.module.less';
import { Link, Route } from 'react-router-dom';

export default (props: any) => {
  const onFinish = (values: any) => {};

  const [visible, setVisible] = useState(false);
  const [rules] = useState({
    username: [
      {
        required: true,
        message: '用户名不能为空!',
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
    ],
  });
  console.log('props', props);
  return (
    <>
      <div className={styles['login-container']}>
        <div className="w-30">
          <img
            src={
              'https://github.githubassets.com/images/modules/logos_page/Octocat.png'
            }
          />
        </div>
        <Form
          layout="horizontal"
          className={styles['form-container']}
          onFinish={onFinish}
          footer={
            <div className="flex justify-center">
              <Button
                block
                shape="rounded"
                type="submit"
                color="primary"
                size="middle"
              >
                登 录
              </Button>
            </div>
          }
        >
          <Form.Header>
            <span className={styles['form-title']}>LearnPlatform</span>
          </Form.Header>
          <Form.Item
            name="account"
            rules={rules.username}
            className={styles['form-item']}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={rules.password}
            className={styles['form-item']}
            extra={
              <div className={styles.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              type={visible ? 'text' : 'password'}
              placeholder="请输入密码"
              clearable
            />
          </Form.Item>
        </Form>
        <div>
          <Space>
            没有账号？去
            <Link to="/register">注册</Link>
          </Space>
        </div>
      </div>
    </>
  );
};
