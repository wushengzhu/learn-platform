import {
  WechatOutlined,
  LockOutlined,
  MobileOutlined,
  QqOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import './index.less'
import { SEND_CODE_MSG } from '../../graphql/auth';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  boxSizing: 'border-box',
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '16px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};


export default () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [rules] = useState({
    username: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码！',
      },
    ],
    phone: [
      {
        required: true,
        message: '请输入手机号！',
      },
      {
        pattern: /^1\d{10}$/,
        message: '手机号格式错误！',
      },
    ],
    captcha: [
      {
        required: true,
        message: '请输入验证码！',
      },
    ]
  });
  const [run] = useMutation(SEND_CODE_MSG)
  const [videoFileUrl] = useState('https://learn-platform-assets.oss-cn-guangzhou.aliyuncs.com/videos/login.mp4')
  return (
    <div className='login-container'>
      <div className='form-container'>
        <div className="left">
          <video src={videoFileUrl} muted loop autoPlay></video>
        </div>
        <div className="right">
          <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: 'white' }}>
              <LoginForm
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="LearnPlatform"
                subTitle="兴趣班学习平台"
                initialValues={{ tel: '15627512936' }}
                actions={
                  <Space>
                    其他登录方式
                    <WechatOutlined style={iconStyles} />
                    <QqOutlined style={iconStyles} />
                  </Space>
                }
              >
                <Tabs
                  centered
                  activeKey={loginType}
                  onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                  <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                  <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
                {loginType === 'account' && (
                  <>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                      }}
                      placeholder={'用户名'}
                      rules={rules.username}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                      }}
                      placeholder={'密码'}
                      rules={rules.password}
                    />
                  </>
                )}
                {loginType === 'phone' && (
                  <>
                    <ProFormText
                      fieldProps={{
                        size: 'large',
                        prefix: <MobileOutlined className={'prefixIcon'} />,
                      }}
                      name="tel"
                      placeholder={'手机号'}
                      rules={rules.phone}
                    />
                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={'请输入验证码'}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${'获取验证码'}`;
                        }
                        return '获取验证码';
                      }}
                      phoneName="tel"
                      name="captcha"
                      rules={rules.captcha}
                      onGetCaptcha={async (tel: string) => {
                        run({
                          variables: {
                            tel,
                          }
                        })
                      }}
                    />
                  </>
                )}
                <div
                  style={{
                    marginBlockEnd: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    自动登录
                  </ProFormCheckbox>
                  <a
                    style={{
                      float: 'right',
                    }}
                  >
                    忘记密码
                  </a>
                </div>
              </LoginForm>
            </div>
          </ProConfigProvider>
        </div>
      </div>
    </div>
  );
};
