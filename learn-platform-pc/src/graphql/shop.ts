import { gql } from "@apollo/client";

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
  query getShopInfoById($id: String!) {
    getShopInfoById(id: $id) {
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

export const COMMIT_SHOP = gql`
  mutation commitShop($params: ShopInput!, $id: String) {
    commitShop(params: $params, id: $id) {
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
