import ShopEdit from '@/components/ShopEdit';
import { useShops } from '@/services/shop';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { PlusOutlined } from '@ant-design/icons';
import {
  ProList,
} from '@ant-design/pro-components';
import { Button, Progress, Tag } from 'antd';
import { useState } from 'react';


const Shop = () => {
  const { loading, data, page, refetch } = useShops();
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>(
    'extra',
  );
  const [showEdit, setShowEdit] = useState(false);
  const [shopId, setShopId] = useState('');
  const onPageChangeHandler = () => { }
  const addInfoHandler = () => {
    setShowEdit(true)
    setShopId('')
  }
  const editInfoHandler = (id: string) => {
    setShowEdit(true)
    setShopId(id)
  }
  const onCloseHander = () => {
    setShowEdit(false);
    refetch();
  }
  const [ghost, setGhost] = useState<boolean>(false);
  const dataSource = [
    '语雀的天空',
    'Ant Design',
    '蚂蚁金服体验科技',
    'TechUI',
    'TechUI 2.0',
    'Bigfish',
    'Umi',
    'Ant Design Pro',
  ].map((item) => ({
    title: item,
    subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
    actions: [
      <a key="run">编辑</a>,
      <a key="delete">删除</a>],
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: (
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            width: 200,
          }}
        >
          <div>发布中</div>
          <Progress percent={80} />
        </div>
      </div>
    ),
  }));
  return (
    <div>
      <ProList<any>
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: false,
          total: data?.length,
          onChange: onPageChangeHandler
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 10, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps,
          },
        }}
        dataSource={dataSource}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={addInfoHandler}
          >
            <PlusOutlined className='mr-1' rev={undefined} />
            新增门店
          </Button>,
        ]}
      />
      {showEdit && (
        <ShopEdit id={shopId} onClose={onCloseHander} />
      )}
    </div>
  );
}

export default Shop;
