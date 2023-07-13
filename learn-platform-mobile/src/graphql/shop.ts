import { gql } from '@apollo/client';

export const GET_SHOPS = gql`
  query getShops($page: PageInput!) {
    getShops(page: $page) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`;

export const GET_SHOP = gql`
  query getShopById($id: String!) {
    getShopById(id: $id) {
      data {
        description
        name
        tags
        id
        establishmentDate
        representative
        shopFrontImg {
          url
        }
        shopRoomImg {
          url
        }
        shopOtherImg {
          url
        }
        logo
        address
        tel
        longitude
        latitude
        identityCardBackImg
        identityCardFrontImg
        businessLicense
      }
      code
      message
    }
  }
`;

export const GET_SIMPLE_SHOP = gql`
  query getShops($page: PageInput!, $name: String) {
    getShops(page: $page, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`;

export const COMMIT_SHOP = gql`
  mutation saveShop($params: ShopInput!, $id: String) {
    saveShop(params: $params, id: $id) {
      code
      message
    }
  }
`;

export const DEL_SHOP = gql`
  mutation deleteShop($id: String!) {
    deleteShop(id: $id) {
      code
      message
    }
  }
`;
