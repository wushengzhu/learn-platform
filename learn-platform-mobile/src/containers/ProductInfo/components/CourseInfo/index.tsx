import { TCourse } from '@/utils/types';
import { Card } from 'antd-mobile';
import style from './index.module.less';
import SplitBar from '@/components/SplitBar';

interface IProps {
  data: TCourse[];
}

/**
 *  课程信息
 */
const CourseInfo = ({ data }: IProps) => (
  <div className={style.container}>
    {data?.map((item) => (
      <Card title={item.cardName} key={item.id} className={style.courseCard}>
        <div className={style.contentItem}>{item.desc}</div>
        <SplitBar />
        <div className={style.contentItem}>
          <div className={style.label}>预约信息</div>
          {item.reserveInfo}
        </div>
        <SplitBar />
        <div className={style.contentItem}>
          <div className={style.label}>退款信息</div>
          {item.refundInfo}
        </div>
        <SplitBar />
        <div className={style.contentItem}>
          <div className={style.label}>其他信息</div>
          {item.otherInfo}
        </div>
      </Card>
    ))}
  </div>
);

export default CourseInfo;
