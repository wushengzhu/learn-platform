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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUploadOSS from '@/hooks/useUploadOSS';
import md5 from 'md5';
import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER, USER_REGISTER } from '@/graphql/user';
import { fail, success } from '@/utils/toast';
import styles from './index.module.less';

interface IValue {
  account: string;
  password: string;
  tel: string;
  avatar?: string;
}

const Register = () => {
  const [avatarImage, setAvatarImage] = useState('');
  const [visible, setVisible] = useState(false);
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
      {
        pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
        message: '只能包含小写字母和数字，长度大于 6',
      },
    ],
  });
  const uploadHandler = useUploadOSS();
  const onChange = async (values: any) => {
    if (values && values.length > 0) {
      setAvatarImage(values[0].url);
    }
  };
  const nav = useNavigate();
  const [register] = useMutation(STUDENT_REGISTER);
  const [form] = Form.useForm();
  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      const formValues = Object.assign(
        {},
        { ...values },
        { avatar: avatarImage, password: md5(values.password) },
      );
      const res = await register({
        variables: formValues,
      });
      if (res.data.studentRegister.code === 200) {
        success('注册成功！');
      } else {
        fail('注册失败！');
      }
    }
  };
  return (
    <div className={styles['register-container']}>
      <div className={styles['form-container']}>
        <div className="flex flex-col justify-center items-center mt-4 mb-4">
          <ImageUploader
            upload={uploadHandler}
            maxCount={1}
            onChange={onChange}
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
          <input id="phone" type="text" placeholder="账户" />
        </div>
        <div className={styles['form-item']}>
          <label>
            <PhonebookOutline fontSize={25} />
          </label>
          <input id="phone" type="text" placeholder="请输入手机号" />
        </div>
        <div className={styles['form-item']}>
          <label>
            <LockOutline fontSize={25} />
          </label>
          <input id="password" type="text" placeholder="请填写密码" />
        </div>
        <div className={styles['form-item']}>
          <label>
            <LockOutline fontSize={25} />
          </label>
          <input id="respassword" type="text" placeholder="请确认密码" />
        </div>
      </div>
      <div className={styles['button-area']}>
        <button className={styles['login-btn']}>注&nbsp;册</button>
      </div>
      <div className={styles.authorization}>
        <input type="checkbox" />
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
  );
};

export default Register;
