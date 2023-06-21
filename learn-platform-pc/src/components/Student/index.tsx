import { useStudents } from '@/services/account';
import {
  Button,
  Card, Empty, Pagination, Space,
} from 'antd';
import { IStudent } from '@/utils/types';
import style from './index.module.less';
import { PlusOutlined, SmileOutlined, SyncOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AccountEdit from '../AccountEdit';

const Student = () => {
  const {
    loading, data, page, refetch,
  } = useStudents();
  const [studentId, setStudentId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  const onCloseHander = () => {
    setShowEdit(false)
  }

  return (
    <div className={style.container}>
      <Card
        extra={
          <div>
            <Button
              icon={<PlusOutlined rev={undefined} />}
              onClick={() => {
                setShowEdit(true)
              }}
              type="primary"
            >
              新增学员
            </Button>
            <Button
              className='ml-2'
              icon={<SyncOutlined rev={undefined} />}
              onClick={() => {
                refetch()
              }}
            >
            </Button>
          </div>
        }
      >
        {
          data && data.length > 0 ? data?.map((item: IStudent) => (
            <Card
              key={item.id}
              hoverable
              className={style.card}
              cover={(
                <div
                  className={style.avatar}
                  style={{ backgroundImage: `url(${item.avatar || 'http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/1675623073445.jpg'} )` }}
                />
              )}
            >
              <Card.Meta
                title={item.name || '无名氏'}
                description={<Space>{[item.account || '无账号', item.tel || '无手机号']}</Space>}
              />
            </Card>
          )) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
        }
        <div className={style.page}>
          <Pagination
            pageSize={page?.pageSize ? page?.pageSize : 12}
            current={page?.pageNum ? page?.pageNum : 1}
            total={page?.total}
            onChange={onPageChangeHandler}
          />
        </div>
      </Card>
      {showEdit && <AccountEdit id={studentId} type={'student'} title={studentId ? '编辑' : '新增'} onClose={onCloseHander} />}
    </div>
  )
}
export default Student
