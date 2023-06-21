
import { Form, Modal, Spin, message } from 'antd';
import { ProForm, ProFormInstance, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/graphql/user';
import { useEffect, useRef, useState } from 'react';
import ImageUpload from '../ImageUpload';
import { useUserContext } from '@/hooks/useHooks';
import { useStudent, useUser } from '@/services/account';
import { COMMIT_STUDENT } from '@/graphql/student';

interface IModalParams {
    id?: string;
    title?: string;
    width?: string | number;
    type: 'user' | 'student' | 'teacher';
    onClose: () => void;
}

/**
* 获取用户信息组件
*/
const AccountEdit = ({ title, id, width, onClose,type}: IModalParams) => {
    const { store } = useUserContext();
    const formRef = useRef<ProFormInstance>();
    const [updateAccount] = useMutation(type==='user'?UPDATE_USER:(type==='student'?COMMIT_STUDENT:COMMIT_STUDENT));
    const [isModalOpen, setIsModalOpen] = useState(true);
    const run = type==='user'?useUser:(type==='student'?useStudent:useStudent)
    const { data } = run(id ? id : '')

    const handleOk = async () => {
        const values = Object.assign({},{...data},{...formRef.current?.getFieldsValue()});
        const res = await updateAccount({
            variables: {
                id: id,
                params: {
                    ...values,
                    avatar: values.avatar[0]?.url || ''
                }
            }
        })
        if (res.data.updateUserInfo.code === 200||res.data.commitStudent.code === 200) {
            store.refetchHandler();
            message.success('更新成功！');
            setIsModalOpen(false);
            return;
        }
        message.error(res.data.updateUserInfo.message||res.data.commitStudent.message);
    };

    const afterClose = () => {
        formRef.current?.setFieldsValue(null)
        Modal.destroyAll();
    }

    useEffect(() => {
        if (data&&id) {
            formRef.current?.setFieldsValue({
                tel: data?.tel,
                name: data?.name,
                account: data?.account,
                desc: data?.desc,
                gender: data?.gender,
                avatar: [{
                    url: data?.avatar || ''
                }] || []
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    return (
        <Modal title={title} width={width} open={isModalOpen} onOk={handleOk} onCancel={onClose} destroyOnClose={true} okText="保存" afterClose={afterClose}>
            <ProForm
                formRef={formRef}
                {...formItemLayout}
                layout="horizontal"
                submitter={false}
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
                    width="lg"
                    name="account"
                    label="账号"
                    disabled={id?true:false}
                    placeholder="账号"
                />
                <ProFormText
                    width="lg"
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
                    width="lg"
                    name="tel"
                    label="电话"
                    disabled={id?true:false}
                    placeholder="请输入电话"
                />
                <ProFormTextArea
                    name="desc"
                    width="lg"
                    label="简介"
                    placeholder="请输入简介"
                />
            </ProForm>
        </Modal>
    );
};

AccountEdit.defaultProps = {
    id: null,
    title: '新增',
    width: 750,
    type:'user'
}
export default AccountEdit;
