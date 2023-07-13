import { useProductsByShopId } from '@/services/product';
import style from './index.module.less';
import { Card, Grid, Result, Image } from 'antd-mobile';

interface IProps {
  shopId: string;
}
/**
 * 推荐课程
 */
const RecommendCourse = ({ shopId }: IProps) => {
  const data = useProductsByShopId(shopId);
  if (!data) {
    <Result status="warning" title="提示" description="没有推荐的课程" />;
  }
  return (
    <Card title="推荐课程" className={style.container}>
      {data?.map((item) => (
        <Grid columns={12}>
          <Grid.Item span={2}>
            <Image src={item.coverUrl} alt="课程图片" className={style.img} />
          </Grid.Item>
          <Grid.Item span={8} className={style.content}>
            <div className={style.title}>{item.name}</div>
            <div className={style.desc}>
              <span className={style.descContent}>{item.desc}</span>
              <span className={style.count}>
                已售&nbsp;
                {item.buyNumber || 0}
              </span>
            </div>
          </Grid.Item>
          <Grid.Item span={2}>
            <div className={style.price}>
              ¥&nbsp;
              {item.preferentialPrice}
            </div>
            <div className={style.oldPrice}>
              ¥&nbsp;
              {item.originalPrice}
            </div>
          </Grid.Item>
        </Grid>
      ))}
    </Card>
  );
};

export default RecommendCourse;
