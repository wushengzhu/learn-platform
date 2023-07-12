import { IProduct } from '@/utils/types';
import style from './index.module.less';
import { Image } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { EnvironmentOutline } from 'antd-mobile-icons';

interface IProps {
  data: IProduct;
}

const ProductCard = ({ data }: IProps) => {
  const [state, setState] = useState();

  return (
    <div className={style.container}>
      <Image src={data.coverUrl} className={style.img} />
      <div className={style.info}>
        <div className={style.name}>{data.name}</div>
        <div className={style.shop}>
          <span className={style.shopName}>{data.shop.name}</span>
          <span className={style.distance}>
            <EnvironmentOutline />
          </span>
        </div>
        <div className={style.price}>
          <span className={style.preferentialPrice}>
            {'￥' + data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            {'￥' + data.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
