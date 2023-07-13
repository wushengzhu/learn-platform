import { useParams } from 'react-router-dom';
import style from './index.module.less';
import { useShop } from '@/services/shop';
import BaseInfo from './components/BaseInfo';
import { Result } from 'antd-mobile';
import DescInfo from './components/DescInfo';
import SplitBar from '@/components/SplitBar';
import RecommendCourse from './components/RecommendCourse';

const ShopInfo = () => {
  const { id } = useParams();
  const { data, loading } = useShop(id || '');

  if (!data) {
    return (
      <Result status="warning" title="提示" description="没有该门店信息" />
    );
  }

  return (
    <div className={style.container}>
      <BaseInfo data={data} key="baseInfo" />
      <SplitBar />
      <DescInfo data={data} key="descInfo" />
      <SplitBar />
      <RecommendCourse shopId={id || ''} />
    </div>
  );
};

export default ShopInfo;
