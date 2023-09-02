import {
  Avatar,
  Button,
  Form,
  ImageUploader,
  Input,
  Space,
  Toast,
} from 'antd-mobile';
import {
  LockOutline,
  UserOutline,
  PhonebookOutline,
  PictureOutline,
} from 'antd-mobile-icons';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUploadOSS from '@/hooks/useUploadOSS';
import md5 from 'md5';
import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER } from '@/graphql/user';
import { fail, success } from '@/utils/toast';
import styles from './index.module.less';
import { validator } from '@/utils/validator';
import { Util } from '@/utils/util';

interface IValue {
  account: string;
  password: string;
  tel: string;
}

const Register = () => {
  const [avatarImage, setAvatarImage] = useState('');
  const [rules] = useState({
    account: [
      {
        required: true,
        message: '用户名不能为空',
      },
      {
        pattern: /^[a-z0-9]{6,10}$/,
        message: '只能包含小写字母和数字，长度大于 6，小于 10',
      },
    ],
    tel: [
      {
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
      {
        pattern: new RegExp(/^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/),
        message: '只能包含小写字母和数字，长度大于 6',
      },
    ],
  });
  const uploadHandler = useUploadOSS();
  const onChangeImage = async (values: any) => {
    if (values && values.length > 0) {
      setAvatarImage(values[0].url);
    }
  };
  const nav = useNavigate();
  const [rePwd, setRePwd] = useState('');
  const [isAgree, setIsAgree] = useState(true);
  const [registerForm, setRegisterForm] = useState<IValue>({
    account: "",
    password: "",
    tel: "",
  });
  const refObj = {
    account: useRef<HTMLDivElement>(null),
    tel: useRef<HTMLDivElement>(null),
    password: useRef<HTMLDivElement>(null),
    avatar: useRef<HTMLDivElement>(null),
  }
  const [registerRefetch] = useMutation(STUDENT_REGISTER);

  const onChange = (e: any, type: string) => {
    const registerObj: IValue = {
      account: registerForm.account,
      tel: registerForm.tel,
      password: registerForm.password,
    }
    registerObj[type as keyof IValue] = e.target.value
    setRegisterForm(registerObj);
    checkErrors(e.target?.value, type)
  }

  const checkErrors = (value: any, type: string) => {
    const curRef = refObj[type as keyof IValue].current
    if (curRef) {
      const errorTip = validator(rules[type as keyof IValue], value)
      curRef.innerText = errorTip + ''
    }
  }

  const onRegister = async () => {
    let hasErrors = false;
    if (!Util.isNullOrWhiteSpace(rePwd) && rePwd !== registerForm.password) {
      hasErrors = true;
    }
    for (const item of Object.keys(registerForm)) {
      checkErrors(registerForm[item as keyof IValue], item)
      const curRefInnerText = refObj[item as keyof IValue].current?.innerText
      if (Util.isNullOrWhiteSpace(curRefInnerText)) {
        hasErrors = true;
      }
    }
    if (!hasErrors) {
      const formValues = Object.assign(
        {},
        { ...registerForm },
        { avatar: avatarImage, password: md5(registerForm.password) },
      );
      const res = await registerRefetch({
        variables: formValues,
      });
      if (res.data.studentRegister.code === 200) {
        success('注册成功！');
        hasErrors = false;
        setRegisterForm({
          account: "",
          password: "",
          tel: "",
        })
        setAvatarImage('')
      }
    } else {
      fail('请按照提示表单修改');
    }
  };
  return (
    <div className={styles['register-bgc']}>
      <div className={styles['register-container']}>
        <div className={styles['form-container']}>
          <div className="flex flex-col justify-center items-center mt-4 mb-4">
            <ImageUploader
              upload={uploadHandler}
              maxCount={1}
              onChange={onChangeImage}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#999999',
                }}
              >
                <PictureOutline fontSize={32} />
              </div>
            </ImageUploader>
          </div>
          <div className={styles['form-item']}>
            <label>
              <UserOutline fontSize={25} />
            </label>
            <input id="phone" type="text" placeholder="账号" value={registerForm.account}
              onChange={(e: any) => onChange(e, 'account')} />
            <div className={styles['input-error']} ref={refObj.account}></div>
          </div >

          <div className={styles['form-item']}>
            <label>
              <PhonebookOutline fontSize={25} />
            </label>
            <input id="phone" type="text" placeholder="请输入手机号" value={registerForm.tel}
              onChange={(e: any) => onChange(e, 'tel')} />
            <div className={styles['input-error']} ref={refObj.tel}></div>
          </div>
          <div className={styles['form-item']}>
            <label>
              <LockOutline fontSize={25} />
            </label>
            <input id="password" type="password" placeholder="请填写密码"
              value={registerForm.password}
              onChange={(e: any) => onChange(e, 'password')} />
            <div className={styles['input-error']} ref={refObj.password}></div>
          </div>
          <div className={styles['form-item']}>
            <label>
              <LockOutline fontSize={25} />
            </label>
            <input id="respassword" type="password" placeholder="请确认密码" value={rePwd} onChange={(e: any) => {
              setRePwd(e.target.value);
            }} />
            <div className={styles['input-error']}>{!Util.isNullOrWhiteSpace(rePwd) && rePwd !== registerForm.password ? '两次输入的密码不一致' : ''}</div>
          </div>
        </div>
        <div className={styles['button-area']}>
          <button className={styles['login-btn']} onClick={(e) => {
            e.preventDefault();
            onRegister();
          }}>注&nbsp;册</button>
        </div>
        <div className={styles.authorization}>
          <input type="checkbox" checked={isAgree} onClick={() => setIsAgree(!isAgree)} />
          <span className={styles['ml-5']}>注册使用即表示同意</span>
          <span className={styles['protocol']}>用户协议及版权声明</span>
        </div>
        <div className={styles['go-login']}>
          已经有账号？去
          <a
            href="#"
            onClick={() => nav('/login')}
            className={styles['protocol']}
          >
            登录
          </a>
        </div>
        <div className={styles.tourism}>
          <img src="images/tourism.png" alt="" />
          <img src="images/tourism2.png" alt="" />
          <img src="images/tourism3.png" alt="" />
        </div>
        <div className={styles.copyright}>
          Copyright&nbsp;&copy;{new Date().getFullYear()}
          &nbsp;
          <a href="https://beian.miit.gov.cn" target="_blank">
            粤ICP备2023094742号-1
          </a>
        </div>
      </div>
    </div>

  );
};

export default Register;
