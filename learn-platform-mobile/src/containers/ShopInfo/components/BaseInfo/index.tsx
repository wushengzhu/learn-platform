import { IShop } from '@/utils/types';
import style from './index.module.less';
import {
  CheckShieldOutline,
  EnvironmentOutline,
  PhoneFill,
} from 'antd-mobile-icons';
import { Swiper, Image, Grid } from 'antd-mobile';

interface IProps {
  data: IShop;
}

const BaseInfo = ({ data }: IProps) => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <img src={data.logo} alt="logo" className={style.logo} />
        <span>{data.name}</span>
      </div>
      <div className={style.tags}>
        {data?.tags?.split(',').map((item: string) => (
          <span className={style.tagSpan} key={item}>
            <CheckShieldOutline />
            <span className={style.tagName}>{item}</span>
          </span>
        ))}
      </div>
      <div className={style.imgSwiper}>
        <Swiper>
          {[...(data.shopFrontImg || []), ...(data.shopRoomImg || [])].map(
            (item) => (
              <Swiper.Item key={item.id}>
                <Image src={item.url} alt="门店图片" fit="contain" />
              </Swiper.Item>
            ),
          )}
        </Swiper>
      </div>
      <div className={style.address}>
        <Grid columns={24}>
          <Grid.Item span={22}>
            <a
              href={`http://api.map.baidu.com/marker?location=${data.latitude},${data.longitude}&title=${data.address}&output=html&content=${data.name}`}
            >
              <EnvironmentOutline className={style.addressIcon} />
              <span className={style.addressText}>{data.address}</span>
            </a>
          </Grid.Item>
          <Grid.Item span={2}>
            <a href={`tel:${data.tel}`}>
              <PhoneFill className={style.phoneIcon} />
            </a>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
};

export default BaseInfo;
