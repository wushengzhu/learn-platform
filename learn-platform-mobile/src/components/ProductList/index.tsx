import { ErrorBlock, Grid } from 'antd-mobile';
import ProductCard from '../ProductCard';
import { useProducts } from '@/services/product';
import style from './index.module.less';
import { GridItem } from 'antd-mobile/es/components/grid/grid';
import PullToRefresh from '../PullToRefresh';
import InfiniteScroll from '../InfiniteScroll';

interface IProps {
  name: string; // 搜索的关键字
  type: string; // 商品分类
}

const ProductList = ({ name, type }: IProps) => {
  const { data, onRefresh, hasMore, loadMore } = useProducts(name, type);

  if (data && data.length === 0) {
    return <ErrorBlock status="empty" />;
  }

  return (
    <div className={style.container}>
      <PullToRefresh onRefresh={onRefresh}>
        <Grid columns={2} gap={10}>
          {data?.map((item) => (
            <GridItem key={item.id}>
              <ProductCard data={item} />
            </GridItem>
          ))}
        </Grid>
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
};

export default ProductList;
