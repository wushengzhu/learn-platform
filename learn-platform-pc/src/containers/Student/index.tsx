import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { Button, Card, Divider, List, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import styles from './index.module.less'
import { PlusOutlined } from "@ant-design/icons";

const Student = () => {
  useTitle('首页');
  const { store } = useUserContext();

  return (
    <Card className={styles['student-container']}>
      <div className="flex justify-end">
        <Button type="primary">
          <PlusOutlined rev={undefined} />
          新增学员
        </Button>,
      </div>
      <Divider></Divider>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              // className={styles.card}
              cover={<img style={{ height: '200px' }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          </List.Item>
        )}
      />
      <div className="flex justify-end">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </Card>
  )
}

export default Student;
