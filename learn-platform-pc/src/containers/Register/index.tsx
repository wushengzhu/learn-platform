import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { USER_REGISTER } from "@/graphql/auth";
import md5 from "md5";
import styles from "./index.module.less";
import { Util } from "@/utils/util";

interface IValue {
    account: string;
    password: string;
    tel: string;
    avatar?: string;
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
    const [registerForm, setRegisterForm] = useState<IValue>({
        account: "",
        password: "",
        tel: "",
        avatar: "",
    });
    const [register] = useMutation(USER_REGISTER);
    const onRegister = async (values: IValue) => {
        if (
            Util.isNullOrWhiteSpace(values.account) ||
            Util.isNullOrWhiteSpace(values.tel) ||
            Util.isNullOrWhiteSpace(values.password)
        ) {
            message.error("账号、密码、电话都不能为空！");
            return;
        }
        const res = await register({
            variables: Object.assign(
                {},
                { ...values },
                {
                    // avatar: values?.avatar ? values?.avatar[0]?.url : "",
                    password: md5(values.password),
                }
            ),
        });
        if (res.data.userRegister.code === 200) {
            message.success("注册成功！");
        } else {
            message.error("注册失败！");
        }
    };

    return (
        <form className={styles["form"]}>
            <h1>账号注册</h1>
            <input
                type="text"
                placeholder="账户名"
                name="account"
                className={styles["form-input"]}
                value={registerForm.account}
                onChange={(e: any) => {
                    setRegisterForm({
                        ...registerForm,
                        account: e.target.value,
                    });
                }}
            />
            <input
                type="tel"
                placeholder="手机号"
                name="tel"
                className={styles["form-input"]}
                value={registerForm.tel}
                onChange={(e: any) => {
                    setRegisterForm({
                        ...registerForm,
                        tel: e.target.value,
                    });
                }}
            />
            <input
                type="password"
                placeholder="密码"
                name="password"
                className={styles["form-input"]}
                value={registerForm.password}
                onChange={(e: any) => {
                    setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                    });
                }}
            />
            {/* 点击出现全局刷可以使用e.preventDefault(); */}
            <button
                className={styles["form_btn"]}
                onClick={(e) => {
                    e.preventDefault();
                    onRegister(registerForm);
                }}
            >
                注&nbsp;册
            </button>
        </form>
    );
};

export default Register;
