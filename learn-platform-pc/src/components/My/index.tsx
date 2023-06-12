import { UPDATE_USER } from "@/graphql/user";
import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { ProFormUploadButton, FooterToolbar, ProForm, ProFormInstance, ProFormRadio, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useMutation } from "@apollo/client";
import { Divider, Form, message, Timeline } from "antd";
import { useEffect, useRef } from "react";
import ImageUpload from "../ImageUpload";
import style from './index.module.less'

const My = () => {
  useTitle('个人信息');
  const { store } = useUserContext();
  const formRef = useRef<ProFormInstance>();
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!store.account) {
      return;
    }
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      account: store.account,
      desc: store.desc,
      gender: store.gender,
      avatar: [{
        url: store.avatar || ''
      }] || []
    })
  }, [store])
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
  }

  return (
    <>
      <div className={style['form-container']}>
        <div className={style.left}>
          <Divider>登录日志</Divider>
          <div className={style.timeline}>
            <Timeline
              mode="right"
              items={[
                {
                  label: '2015-09-01',
                  children: 'Create a services',
                },
                {
                  label: '2015-09-01 09:12:11',
                  children: 'Solve initial network problems',
                },
                {
                  children: 'Technical testing',
                },
                {
                  label: '2015-09-01 09:12:11',
                  children: 'Network problems being solved',
                },
              ]}
            />
          </div>
        </div >
        <Divider type="vertical" style={{ minHeight: '100vh' }} />
        <ProForm
          formRef={formRef}
          {...formItemLayout}
          layout="horizontal"
          className={style.right}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (values) => {
            const res = await updateUser({
              variables: {
                id: store.id,
                params: {
                  name: values.name,
                  desc: values.desc,
                  gender: values.gender,
                  avatar: values.avatar[0]?.url || ''
                }
              }
            })
            console.log(res)
            if (res.data.updateUserInfo.code === 200) {
              store.refetchHandler();
              message.success('更新成功！');
              return;
            }
            message.error(res.data.updateUserInfo.message);
          }}
        >
          {/* 方案一：利用ProForm本身的组件上传 <ProFormUploadButton name="avatar" listType="picture-circle" /> */}
          <Form.Item
            name="avatar"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 13 }}
            className="flex justify-center"
          >
            <ImageUpload />
          </Form.Item>
          <ProFormText
            width="md"
            name="account"
            label="账号"
            disabled
            placeholder="账号"
          />
          <ProFormText
            width="md"
            name="name"
            label="昵称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormRadio.Group
            label="性别"
            name="gender"
            initialValue="true"
            options={[{ label: '男', value: true }, { label: '女', value: false }]}
          />
          <ProFormText
            width="md"
            name="tel"
            label="电话"
            disabled
            placeholder="请输入电话"
          />
          <ProFormTextArea
            name="desc"
            width="md"
            label="简介"
            placeholder="请输入简介"
          />
        </ProForm>
      </div >
    </>
  )
}

export default My;


