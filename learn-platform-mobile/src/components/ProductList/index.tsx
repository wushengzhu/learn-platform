import { Grid } from 'antd-mobile';
import ProductCard from '../ProductCard';
import { useProducts } from '@/services/product';
import style from './index.module.less';
import { GridItem } from 'antd-mobile/es/components/grid/grid';

interface IProps {
  name: string; // 搜索的关键字
  type: string; // 商品分类
}

const ProductList = ({ name, type }: IProps) => {
  const { data } = useProducts(name, type);
  return (
    <div className={style.container}>
      <Grid columns={2} gap={10}>
        {data?.map((item) => (
          <GridItem key={item.id}>
            <ProductCard data={item} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
