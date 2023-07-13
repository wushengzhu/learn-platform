import { gql } from '@apollo/client';

export const GET_PRODUCT_TYPES = gql`
  query getProductTypes {
    getProductTypes {
      data {
        key
        title
      }
    }
  }
`;

export const GET_PRODUCTS_BY_SHOP_ID = gql`
  query getProductsByShopIdForH5($orgId: String!) {
    getProductsByShopIdForH5(orgId: $orgId) {
      code
      message
      data {
        id
        name
        coverUrl
        desc
        originalPrice
        preferentialPrice
        buyNumber
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProductsForH5(
    $page: PageInput!
    $longitude: Float!
    $latitude: Float!
    $name: String
    $type: String
  ) {
    getProductsForH5(
      page: $page
      longitude: $longitude
      latitude: $latitude
      name: $name
      type: $type
    ) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        limitBuyNumber
        name
        coverUrl
        bannerUrl
        desc
        status
        originalPrice
        stock
        preferentialPrice
        shop {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProductById($id: String!) {
    getProductById(id: $id) {
      code
      message
      data {
        id
        limitBuyNumber
        name
        type
        coverUrl
        bannerUrl
        desc
        status
        originalPrice
        stock
        curStock
        buyNumber
        preferentialPrice
        shop {
          logo
          name
          tel
        }
        cards {
          id
          name
          type
          time
          validityDay
          course {
            id
            name
            desc
            group
            baseAbility
            limitNumber
            duration
            reserveInfo
            refundInfo
            otherInfo
          }
        }
      }
    }
  }
`;
