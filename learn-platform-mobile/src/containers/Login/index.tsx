import React, { RefObject, useRef, useState } from 'react';
import { Form, Input, Button, Space } from 'antd-mobile';
import { LockOutline, UserOutline, PhonebookOutline } from 'antd-mobile-icons';
import styles from './index.module.less';
import { Link, Route, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { STUDENT_LOGIN } from '@/graphql/user';
import { AUTH_TOKEN } from '@/utils/constants';
import md5 from 'md5';
import { fail, success } from '@/utils/toast';

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
        success('登录成功！');
        nav('/');
      } else {
        fail('登录失败！');
      }
    }
  };

  const [isVerifyCode, setIsVerifyCode] = useState(true);
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
        <div className={styles['login-header']}>
          <h1>欢迎登录</h1>
        </div>
        <div className={styles['login-logo']}>
          <h1>在线兴趣学习平台</h1>
        </div>
        <div className={styles['form-container']}>
          <div className={styles['form-item']}>
            <label>
              <img src="images/phone.png" alt="" />
            </label>
            <input id="phone" type="tel" placeholder="请输入手机号" />
          </div>
          <div className={styles['form-item']}>
            <label>
              <img src="images/code.png" alt="" />
            </label>
            <input id="code" type="text" placeholder="请输入验证码" />
            <button>发送验证码</button>
          </div>
        </div>
        <div className={styles['button-area']}>
          <button className={styles['login-btn']}>登录</button>
          <button
            className={styles['login-register']}
            onClick={() => nav('/register')}
          >
            注册
          </button>
        </div>
        <div className={styles.casual}>
          <a href="#" onClick={() => setIsVerifyCode(false)}>
            密码登录
          </a>
        </div>
        <div className={styles['order-login']}>
          <p>使用第三方账号登录</p>
          <ul>
            <li>
              <a href="#">
                <img src="images/QQ.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="images/WeChat.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.copyright}>
          Copyright&nbsp;&copy;{new Date().getFullYear()}
          &nbsp;
          <a href="https://beian.miit.gov.cn" target="_blank">
            粤ICP备2023094742号-1
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
