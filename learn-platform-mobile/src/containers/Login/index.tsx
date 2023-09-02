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
  const [login] = useMutation(STUDENT_LOGIN);
  const nav = useNavigate();
  const [loginForm, setLoginForm] = useState<IValue>({
    account: "",
    password: "",
    tel: "",
    avatar: "",
  });
  const onLogin = async () => {
    if (loginForm) {
      const res = await login({
        variables: {
          ...loginForm,
          password: md5(loginForm.password),
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

  const [isVerifyCode, setIsVerifyCode] = useState(false);
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
      <div className={styles['login-bgc']}>
        <div className={styles['login-container']}>
          <div className={styles['login-header']}>
            <h1>欢迎登录</h1>
          </div>
          <div className={styles['login-logo']}>
            <h1>在线兴趣学习平台</h1>
          </div>
          <div className={styles['form-container']}>
            {
              isVerifyCode && (
                <div>
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
              )
            }
            {
              !isVerifyCode && (
                <div>
                  <div className={styles['form-item']}>
                    <label>
                      <UserOutline fontSize={24} />
                    </label>
                    <input id="account" type="text" placeholder="账号" value={loginForm.account}
                      onChange={(e: any) => {
                        setLoginForm({
                          ...loginForm,
                          account: e.target.value,
                        });
                      }} />
                  </div>
                  <div className={styles['form-item']}>
                    <label>
                      <LockOutline fontSize={24} />
                    </label>
                    <input id="password" type="password" placeholder="密码" value={loginForm.password}
                      onChange={(e: any) => {
                        setLoginForm({
                          ...loginForm,
                          password: e.target.value,
                        });
                      }} />
                  </div>
                </div>
              )
            }
          </div>
          <div className={styles['button-area']}>
            <button className={styles['login-btn']} onClick={(e) => {
              e.preventDefault();
              onLogin();
            }}>登&nbsp;录</button>
            <button
              className={styles['login-register']}
              onClick={() => nav('/register')}
            >
              注&nbsp;册
            </button>
          </div>
          <div className={styles.casual}>
            <a href="#" onClick={() => setIsVerifyCode(!isVerifyCode)}>
              {isVerifyCode ? '密码登录' : '验证码登录'}
            </a>
          </div>
          {/* <div className={styles['order-login']}>
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
        </div> */}
          <div className={styles.copyright}>
            Copyright&nbsp;&copy;{new Date().getFullYear()}
            &nbsp;
            <a href="https://beian.miit.gov.cn" target="_blank">
              粤ICP备2023094742号-1
            </a>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
