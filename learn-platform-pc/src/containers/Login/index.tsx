import {
  WechatOutlined,
  LockOutlined,
  MobileOutlined,
  QqOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Button, message, Space, Tabs } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import "./index.less";
import { ACCOUNT_LOGIN, LOGIN, SEND_CODE_MSG, TEL_LOGIN } from "@/graphql/auth";
import { AUTH_TOKEN } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import Register from "../Register";
import { useTitle } from "@/hooks/useTitle";

type LoginType = "phone" | "account";

const iconStyles: CSSProperties = {
  boxSizing: "border-box",
  marginInlineStart: "16px",
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "16px",
  verticalAlign: "middle",
  cursor: "pointer",
};

interface IValueT {
  tel: string;
  code: string;
  autoLogin: boolean;
}

interface IValueA {
  account: string;
  password: string;
  autoLogin: boolean;
}

export default () => {
  useTitle("登录");
  const [loginType, setLoginType] = useState<LoginType>("account");
  const nav = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [rules] = useState({
    account: [
      {
        required: true,
        message: "请输入用户名!",
      },
    ],
    password: [
      {
        required: true,
        message: "请输入密码！",
      },
    ],
    phone: [
      {
        required: true,
        message: "请输入手机号！",
      },
      {
        pattern: /^1\d{10}$/,
        message: "手机号格式错误！",
      },
    ],
    captcha: [
      {
        required: true,
        message: "请输入验证码！",
      },
    ],
  });
  const [run] = useMutation(SEND_CODE_MSG);
  const [accountLoginRequest] = useMutation(ACCOUNT_LOGIN);
  const [telLoginRequest] = useMutation(TEL_LOGIN);
  const [videoFileUrl] = useState(
    "https://learn-platform-assets.oss-cn-guangzhou.aliyuncs.com/videos/login.mp4"
  );

  const items = [
    { label: "账号密码登录", key: "account" },
    { label: "手机号登录", key: "phone" },
  ];

  const loginHandler = async (values: any) => {
    const res =
      loginType === "account"
        ? await accountLoginRequest({
            variables: values as IValueA,
          })
        : await telLoginRequest({
            variables: values as IValueT,
          });
    if (res.data?.login?.code === 200 || res.data?.studentLogin?.code === 200) {
      const token = res.data?.login?.data
        ? res.data?.login?.data
        : res.data?.studentLogin?.data;
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, "");
        // 是否勾选了自动登录
        localStorage.setItem(AUTH_TOKEN, token);
      } else {
        localStorage.setItem(AUTH_TOKEN, "");
        sessionStorage.setItem(AUTH_TOKEN, token);
      }
      message.success("登录成功！");
      nav("/");
      return;
    }
    message.error("登录失败！");
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="left">
          <video src={videoFileUrl} muted loop autoPlay></video>
        </div>
        <div className="right">
          {isRegistered && (
            <Register setIsRegistered={setIsRegistered}></Register>
          )}
          {!isRegistered && (
            <ProConfigProvider hashed={false}>
              <div style={{ backgroundColor: "white" }}>
                <LoginForm
                  onFinish={loginHandler}
                  logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                  title="LearnPlatform"
                  subTitle="兴趣班学习平台"
                  initialValues={{ tel: "15627512936" }}
                  actions={
                    <div>
                      <div className="flex justify-center items-center mb-2">
                        没有账号？去
                        <Button
                          type="link"
                          onClick={() => setIsRegistered(true)}
                        >
                          注册
                        </Button>
                      </div>
                      <Space>
                        其他登录方式
                        <WechatOutlined style={iconStyles} rev={undefined} />
                        <QqOutlined style={iconStyles} rev={undefined} />
                      </Space>
                    </div>
                  }
                >
                  <Tabs
                    centered
                    items={items}
                    activeKey={loginType}
                    onChange={(activeKey) =>
                      setLoginType(activeKey as LoginType)
                    }
                  ></Tabs>
                  {loginType === "account" && (
                    <>
                      <ProFormText
                        name="account"
                        fieldProps={{
                          size: "large",
                          prefix: (
                            <UserOutlined
                              className={"prefixIcon"}
                              rev={undefined}
                            />
                          ),
                        }}
                        placeholder={"用户名"}
                        rules={rules.account}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: "large",
                          prefix: (
                            <LockOutlined
                              className={"prefixIcon"}
                              rev={undefined}
                            />
                          ),
                        }}
                        placeholder={"密码"}
                        rules={rules.password}
                      />
                    </>
                  )}
                  {loginType === "phone" && (
                    <>
                      <ProFormText
                        fieldProps={{
                          size: "large",
                          prefix: (
                            <MobileOutlined
                              className={"prefixIcon"}
                              rev={undefined}
                            />
                          ),
                        }}
                        name="tel"
                        placeholder={"手机号"}
                        rules={rules.phone}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: "large",
                          prefix: (
                            <LockOutlined
                              className={"prefixIcon"}
                              rev={undefined}
                            />
                          ),
                        }}
                        captchaProps={{
                          size: "large",
                        }}
                        placeholder={"请输入验证码"}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${"获取验证码"}`;
                          }
                          return "获取验证码";
                        }}
                        phoneName="tel"
                        name="code"
                        rules={rules.captcha}
                        onGetCaptcha={async (tel: string) => {
                          const res = await run({
                            variables: {
                              tel,
                            },
                          });
                          if (res?.data?.sendCodeMsg.code === 200) {
                            message.success("获取验证码成功！");
                          } else {
                            message.error("获取验证码失败！");
                          }
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
                        float: "right",
                      }}
                    >
                      忘记密码
                    </a>
                  </div>
                </LoginForm>
              </div>
            </ProConfigProvider>
          )}
        </div>
      </div>
    </div>
  );
};
