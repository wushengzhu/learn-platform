import { GET_SHOP } from '@/graphql/shop';
import { useLazyQuery, useQuery } from '@apollo/client';
import { TShopQuery } from '@/utils/types';

export const useShop = (id: string) => {
  const { loading, data } = useQuery<TShopQuery>(GET_SHOP, {
    variables: {
      id,
    },
  });
  return {
    loading,
    data: data?.getShopById?.data,
  };
};

// 手动触发
export const useOnShop = () => {
  const [get, { loading }] = useLazyQuery(GET_SHOP);

  const getShop = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });

    return res.data?.getShopById?.data;
  };

  return { getShop, loading };
};
