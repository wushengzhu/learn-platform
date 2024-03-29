import {
    WechatOutlined,
    LockOutlined,
    MobileOutlined,
    QqOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, message, Space, Tabs } from "antd";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_CODE_MSG, TEL_LOGIN, USER_LOGIN } from "@/graphql/auth";
import { AUTH_TOKEN } from "@/utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import md5 from "md5";
import { useUserContext } from "@/hooks/useHooks";
import styles from "./index.module.less";
import classNames from "classnames";
import Register from "../Register";
import { Util } from "@/utils/util";

type LoginType = "phone" | "account";

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
    const { store } = useUserContext();
    const [loginType, setLoginType] = useState<LoginType>("account");
    const nav = useNavigate();
    const [loginForm, setLoginForm] = useState({
        account: "",
        password: "",
        tel: "",
        autoLogin: false,
    });
    const [isSignUp, setISignUp] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);
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
    const [accountLoginRequest] = useMutation(USER_LOGIN);
    const [telLoginRequest] = useMutation(TEL_LOGIN);
    const loginHandler = async (values: any) => {
        if (Util.isNullOrWhiteSpace(values.account) || Util.isNullOrWhiteSpace(values.password)) {
            message.error("账号或密码不能为空！");
            return;
        }
        const res = !isVerifyCode
            ? await accountLoginRequest({
                variables: Object.assign(
                    {},
                    { ...values },
                    { password: md5(values.password) }
                ) as IValueA,
            })
            : await telLoginRequest({
                variables: values as IValueT,
            });
        if (
            res.data?.login?.code === 200 ||
            res.data?.userLogin?.code === 200
        ) {
            store.refetchHandler();
            const token = res.data?.login?.data
                ? res.data?.login?.data
                : res.data?.userLogin?.data;
            if (values.autoLogin) {
                sessionStorage.setItem(AUTH_TOKEN, "");
                // 是否勾选了自动登录
                localStorage.setItem(AUTH_TOKEN, token);
            } else {
                localStorage.setItem(AUTH_TOKEN, "");
                sessionStorage.setItem(AUTH_TOKEN, token);
            }
            message.success("登录成功！");
            const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
            if (lastVisitedRoute) {
                nav(lastVisitedRoute);
            } else {
                nav("/");
            }
            return;
        }
    };

    return (
        <div className={styles["login-container"]}>
            <div
                className={classNames({
                    [styles["form-container"]]: true,
                    [styles["right-panel-active"]]: isSignUp,
                })}
            >
                <div className={styles["sign-up-container"]}>
                    <Register />
                </div>
                <div className={styles["sign-in-container"]}>
                    <form className={styles["form"]}>
                        <h1>在线兴趣学习平台</h1>
                        <div className={styles["login-form"]}>
                            {isVerifyCode && (
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="手机号"
                                        className={styles["form-input"]}
                                        value={loginForm.tel}
                                        onChange={(e: any) => {
                                            setLoginForm({
                                                ...loginForm,
                                                tel: e.target.value,
                                            });
                                        }}
                                    />
                                    <div className={styles["verify-code"]}>
                                        <input
                                            type="number"
                                            placeholder="验证码"
                                            className={styles["form-input"]}
                                            style={{ width: "70%" }}
                                        />
                                        <input
                                            type="button"
                                            value="发送"
                                            className={styles["send-code"]}
                                        />
                                    </div>
                                </div>
                            )}
                            {!isVerifyCode && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="用户名"
                                        required
                                        className={styles["form-input"]}
                                        value={loginForm.account}
                                        onChange={(e: any) => {
                                            setLoginForm({
                                                ...loginForm,
                                                account: e.target.value,
                                            });
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="密码"
                                        required
                                        className={styles["form-input"]}
                                        value={loginForm.password}
                                        onChange={(e: any) => {
                                            setLoginForm({
                                                ...loginForm,
                                                password: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            )}

                            <div className={styles["other-login"]}>
                                <div
                                    className={styles["login-type"]}
                                    onClick={() =>
                                        setIsVerifyCode(!isVerifyCode)
                                    }
                                >
                                    {isVerifyCode ? "密码登录" : "验证码登录"}
                                </div>
                                <div className={styles["auto-login"]}>
                                    <input
                                        type="checkbox"
                                        checked={loginForm.autoLogin}
                                        onChange={(e: any) => {
                                            setLoginForm({
                                                ...loginForm,
                                                autoLogin: e.target.value,
                                            });
                                        }}
                                    />
                                    <span>&nbsp;自动登录</span>
                                </div>
                            </div>
                            <button
                                className={styles["form_btn"]}
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginHandler(loginForm);
                                }}
                            >
                                登&nbsp;录
                            </button>
                        </div>
                    </form>
                </div>
                <div className={styles["overlay-container"]}>
                    <div className={styles["overlay-left"]}>
                        <h1>欢迎回来</h1>
                        <p>
                            To keep connected with us please login with your
                            personal info
                        </p>
                        <button
                            id="signIn"
                            className={styles["overlay_btn"]}
                            onClick={() => setISignUp(false)}
                        >
                            登&nbsp;录
                        </button>
                    </div>
                    <div className={styles["overlay-right"]}>
                        <h1>Hello, 朋友</h1>
                        <p>
                            Enter your personal details and start journey with
                            us
                        </p>
                        <button
                            id="signUp"
                            className={styles["overlay_btn"]}
                            onClick={() => setISignUp(true)}
                        >
                            注&nbsp;册
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
