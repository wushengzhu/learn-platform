import React, { RefObject, useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import styles from './index.module.less';

export default (props: any) => {
  const onFinish = (values: any) => {

  };

  const [visible, setVisible] = useState(false)
  const [rules] = useState({
    username: [
      {
        required: true,
        message: '请输入账号!',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码！',
      },
    ]
  });

  return (
    <>
      <div className={styles['login-container']}>
        <div className="w-30">
          <img src={"https://github.githubassets.com/images/modules/logos_page/Octocat.png"} />
        </div>
        <Form
          layout="horizontal"
          className={styles['form-container']}
          onFinish={onFinish}
          footer={(
            <div className="flex justify-center">
              <Button block onClick={() => { props.history.push('/register') }} shape='rounded' size="middle" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", border: 0, color: 'white' }}>
                注 册
              </Button>
              <Button block shape='rounded' type="submit" color="primary" size="middle" className="left-2">
                登 录
              </Button>
            </div>
          )}
        >
          <Form.Header><span className={styles['form-title']}>LearnPlatform</span></Form.Header>
          <Form.Item
            name="account"
            rules={rules.username}
            className={styles['form-item']}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="password" rules={rules.password} className={styles['form-item']} extra={
            <div className={styles.eye}>
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
    </>
  );
};
