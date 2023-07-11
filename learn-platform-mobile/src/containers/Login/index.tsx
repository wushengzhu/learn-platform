import React, { RefObject, useRef, useState } from 'react';
import { Form, Input, Button, Space } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import styles from './index.module.less';
import { Link, Route, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import toast from '@/utils/toast';
import { STUDENT_LOGIN } from '@/graphql/user';
import { AUTH_TOKEN } from '@/utils/constants';
import * as md5 from 'md5';

const Login = () => {
  const [form] = Form.useForm();
  const [login] = useMutation(STUDENT_LOGIN);
  const nav = useNavigate();

  const onLogin = async () => {
    const values = await form.validateFields();
    if (values) {
      const res = await login({
        variables: {
          ...values,
          password: md5(values.password),
        },
      });
      if (res.data.studentLogin.code === 200) {
        localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
        toast.success('登录成功！');
        nav('/');
      } else {
        toast.fail('登录失败！');
      }
    }
  };

  const [visible, setVisible] = useState(false);
  const [rules] = useState({
    account: [
      {
        required: true,
        message: '用户名不能为空!',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码！',
      },
    ],
  });
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
          form={form}
          layout="horizontal"
          className={styles['form-container']}
          footer={
            <div className="flex justify-center">
              <Button
                block
                shape="rounded"
                type="submit"
                color="primary"
                size="middle"
                onClick={() => onLogin()}
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
            rules={rules.account}
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

export default Login;
