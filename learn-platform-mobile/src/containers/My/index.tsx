import { Grid, Image, List } from 'antd-mobile';
import style from './index.module.less'
import { useUserContext } from '@/hooks/useAuth';
import { BankcardOutline, FaceRecognitionOutline, SetOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menu';

const My = () => {
  const { store } = useUserContext()
  const { go } = useGoTo()

  return <div className={style.container}>
    <Grid columns={10} className={style.card}>
      <Grid.Item span={4}>
        <Image className={style.avatar} src={store.avatar} alt='个人头像' />
      </Grid.Item>
      <Grid.Item span={6}>
        <div className={style.name}>{store.name}</div>
        <div className={style.edit} onClick={() => go(ROUTE_KEY.EDITINFO)}>编辑资料</div>
      </Grid.Item>
    </Grid>
    <List className={style.list}>
      <List.Item prefix={<FaceRecognitionOutline />} onClick={() => go(ROUTE_KEY.ORDER_COURSE)}>预约课程</List.Item>
      <List.Item prefix={<UnorderedListOutline />} onClick={() => go(ROUTE_KEY.MY_COURSE)}>我的课程表</List.Item>
      <List.Item prefix={<BankcardOutline />} onClick={() => go(ROUTE_KEY.MY_CARD)}>我的消费卡</List.Item>
      <List.Item prefix={<SetOutline />} onClick={() => go(ROUTE_KEY.MY_CARD)}>设置</List.Item>
    </List>
  </div>
};

export default My;
