import { Avatar, Button, Form, Input } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';

export default () => {
  const [avatarImages] = useState('');
  const [visible, setVisible] = useState(false)
  const [rules] = useState({
    username: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
    tel: [
      {
        required: false,
        message: '电话格式不对',
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
    <div>
      <div className="flex flex-col justify-center items-center mt-4 mb-4">
        <div className='mb-4'>手机注册</div>
        <Avatar src={avatarImages} style={{ '--size': '64px' }} />
      </div>
      <Form layout="horizontal"
        footer={(
          <div>
            {/* <Button block onClick={() => { }} shape='rounded' size="middle" >
              返回
            </Button> */}
            <Button block shape='rounded' type="submit" color="primary" size="middle" className="mt-10">
              注 册
            </Button>
          </div>
        )}
      >
        <Form.Item label="用户名" name="username" rules={rules.username}>
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item label="电话" name="tel" rules={rules.tel}>
          <Input placeholder="请输入电话" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={rules.password} extra={
          <div>
            {!visible ? (
              <EyeInvisibleOutline onClick={() => setVisible(true)} />
            ) : (
              <EyeOutline onClick={() => setVisible(false)} />
            )}
          </div>
        }>
          <Input type={visible ? 'text' : 'password'} placeholder="请输入密码" clearable />
        </Form.Item>
      </Form>
    </div>
  );
};
