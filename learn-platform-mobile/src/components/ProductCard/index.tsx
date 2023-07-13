import { IProduct } from '@/utils/types';
import style from './index.module.less';
import { Image } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { EnvironmentOutline } from 'antd-mobile-icons';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menu';

interface IProps {
  data: IProduct;
}

const ProductCard = ({ data }: IProps) => {
  const [state, setState] = useState();
  const { go } = useGoTo();

  const loadShopInfo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    go(ROUTE_KEY.SHOPINFO, { id });
  };

  return (
    <div className={style.container}>
      <Image src={data.coverUrl} className={style.img} />
      <div className={style.info}>
        <div className={style.name}>{data.name}</div>
        <div className={style.shop}>
          <span onClick={(e) => loadShopInfo(data.shop.id, e)}>
            {/* <EnvironmentOutline /> */}
            {data.shop.name}
          </span>
          <span className={style.distance}>{data.distance || '未知'}</span>
        </div>
        <div className={style.price}>
          <span className={style.preferentialPrice}>
            ￥{data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>￥{data.originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
