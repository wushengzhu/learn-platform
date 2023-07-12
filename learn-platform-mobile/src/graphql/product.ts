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
