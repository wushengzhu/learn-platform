import AccountEdit from '@/components/AccountEdit';
import ImageUpload from '@/components/ImageUpload';
import { useUsers } from '@/services/account';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';


type TableListItem = {
  id: string;
  name: string;
  desc: string;
  tel: string;
  password: string;
  account: string;
  gender: boolean;
  avatar: string;
  code: string;
  codeCreateTimeAt: Date;
};

const User = () => {
  const actionRef = useRef<ActionType>();
  const { loading, data, page, refetch } = useUsers();
  const [showEdit, setShowEdit] = useState(false);
  const [userId, setUserId] = useState('');
  const columns: ProColumns<TableListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      search:false,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      copyable: true,
      ellipsis: true,
      width: 120,
      search:false,
      render: (_, record) => (
        <ImageUpload value={[{ url: record?.avatar, uid: record?.id, name: record?.name }]} listType={'picture-card'} />
      ),
    },
    {
      title: '账号名',
      dataIndex: 'account',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '昵称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      width: 100
    },
    {
      title: '电话号码',
      dataIndex: 'tel',
      copyable: true,
      ellipsis: true,
      width: 120
    },
    {
      title: '简介',
      dataIndex: 'desc',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={
            () => {
              setUserId(record?.id)
              setShowEdit(true)
            }
          }
        >
          编辑
        </a>,
        <a href={''} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  const onCloseHander = () => {
    setShowEdit(false)
  }
  return (
    <div>
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        loading={loading}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: page?.pageSize,
          onChange: (page) => refetch({ page: { pageNum: page, pageSize: 10 } }),
        }}
        request={() => {
          refetch();
          return Promise.resolve({
            total: page?.total,
            data: data,
            success: true,
          });
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined rev={undefined} />}
            onClick={() => {
              setShowEdit(true)
            }}
            type="primary"
          >
            新增用户
          </Button>,
          // <Dropdown
          //   key="menu"
          //   menu={{
          //     items: [
          //     ],
          //   }}
          // >
          //   <Button>
          //     <EllipsisOutlined rev={undefined} />
          //   </Button>
          // </Dropdown>,
        ]}
      />
      {showEdit && <AccountEdit id={userId} title={userId?'编辑':'新增'} onClose={onCloseHander}/>}
    </div>
  );
};

export default User
