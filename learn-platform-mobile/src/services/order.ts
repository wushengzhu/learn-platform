import { GET_WXPAY_CONFIG, MOCK_ORDER } from '@/graphql/order';
import { TWxConfigQuery } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { Toast } from 'antd-mobile';

export const useWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxConfigQuery>(GET_WXPAY_CONFIG);

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number,
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    });

    // 被限购了
    if (res.data?.getWxpayConfig.code === 10031) {
      Toast.show({
        content: res.data?.getWxpayConfig.message,
      });
      return null;
    }
    return res.data?.getWxpayConfig.data;
  };

  return {
    getWxConfig: getHandler,
    loading,
  };
};

/**
 * mock 订单数据
 */
export const useMockOrder = () => {
  const [get, { loading }] = useMutation(MOCK_ORDER);

  const getHandler = async (
    productId: string,
    quantity: number,
    amount: number,
  ) => {
    const res = await get({
      variables: {
        productId,
        amount,
        quantity,
      },
    });
    return res.data?.mockOrderGenerator;
  };

  return {
    get: getHandler,
    loading,
  };
};
