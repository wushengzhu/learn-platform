import { gql } from '@apollo/client';

export const GET_WXPAY_CONFIG = gql`
  mutation getWxpayConfig(
    $productId: String!
    $quantity: Float!
    $amount: Float!
  ) {
    getWxpayConfig(
      productId: $productId
      quantity: $quantity
      amount: $amount
    ) {
      code
      data {
        appId
        timeStamp
        nonceStr
        package
        signType
        paySign
      }
      message
    }
  }
`;

/**
 * mock order 数据
 */
export const MOCK_ORDER = gql`
  mutation mockOrderGenerator(
    $productId: String!
    $quantity: Float!
    $amount: Float!
  ) {
    mockOrderGenerator(
      productId: $productId
      quantity: $quantity
      amount: $amount
    ) {
      code
      message
    }
  }
`;
