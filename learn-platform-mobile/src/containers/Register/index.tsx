import useUploadOSS from '@/hooks/useUploadOSS';
import { Avatar, Button, Form, ImageUploader, Input, Space } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline, PictureOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [avatarImages] = useState('');
  const [visible, setVisible] = useState(false);
  const [rules] = useState({
    account: [
      {
        required: true,
        message: '用户名不能为空',
      },
      {
        pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
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
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4 mb-4">
        <div className="mb-4">手机注册</div>
        <Avatar src={avatarImages} style={{ '--size': '64px' }} />
        <ImageUploader upload={uploadHandler}>
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
            <PictureOutline style={{ fontSize: 32 }} />
          </div>
        </ImageUploader>
      </div>
      <Form
        layout="horizontal"
        footer={
          <div>
            {/* <Button block onClick={() => { }} shape='rounded' size="middle" >
              返回
            </Button> */}
            <Button
              block
              shape="rounded"
              type="submit"
              color="primary"
              size="middle"
              className="mt-10"
            >
              注 册
            </Button>
          </div>
        }
      >
        <Form.Item label="用户名" name="account" rules={rules.account}>
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item label="电话" name="tel" rules={rules.tel}>
          <Input placeholder="请输入电话" clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={rules.password}
          extra={
            <div>
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
      <div className="flex justify-center">
        <Space>
          有账号了？去
          <Link to="/login">登录</Link>
        </Space>
      </div>
    </div>
  );
};
