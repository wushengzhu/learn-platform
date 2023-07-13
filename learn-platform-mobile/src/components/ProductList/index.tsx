import { ErrorBlock, Grid, PullToRefresh } from 'antd-mobile';
import ProductCard from '../ProductCard';
import { useProducts } from '@/services/product';
import style from './index.module.less';
// import { GridItem } from 'antd-mobile/es/components/grid/grid';
// import PullToRefresh from '../PullToRefresh';
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
      {/* 注意地，本地PullToRefresh组件有点小问题：影响子组件card内点击事件不生效 */}
      <PullToRefresh onRefresh={onRefresh} completeDelay={500}>
        <Grid columns={2} gap={10}>
          {data?.map((item) => (
            <Grid.Item key={item.id}>
              <ProductCard data={item} />
            </Grid.Item>
          ))}
        </Grid>
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
};

export default ProductList;
