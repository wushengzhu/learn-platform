import { GET_PRODUCTS, GET_PRODUCT_TYPES } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import { IProduct, TProductTypeQuery, TProductsQuery } from '@/utils/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

/**
 * 获取商品列表
 * @param pageNum
 * @param pageSize
 * @param type
 */
export const useProducts = (name = '', type = '') => {
  const pn = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<IProduct[]>([]);
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  console.log('pn.current', pn.current);

  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    // const {
    //   latitude,
    //   longitude,
    // } = await getPosition();
    const res = await get({
      fetchPolicy: 'network-only',
      variables: {
        name,
        type: type === DEFAULT_TYPE ? '' : type,
        latitude: 120,
        longitude: 38,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
      onCompleted() {
        toast.close();
      },
    });
    return res.data?.getProductsForH5.data || [];
  };

  const onRefreshHandler = async () => {
    // 重新初始化设置
    pn.current = 1;
    const res = await init();
    // 这里要提前对于更多值(hasMore)加一个判断，
    // 防止切换 type 的时候，hasMore 没有变成默认值
    if (res.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setData(res);
  };

  useEffect(() => {
    onRefreshHandler();
  }, [name, type]);

  const loadMoreHandler = async () => {
    const res = await init(pn.current + 1);
    if (res.length > 0) {
      pn.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
    } else {
      setHasMore(false);
    }
  };

  return {
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
    hasMore,
    data,
  };
};
