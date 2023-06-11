import { gql } from '@apollo/client';

export const GET_SHOPS = gql`
  query getShops($page:PageInput!){
    getShops(page:$page){
      code
      message
      page{
        total
        pageNum
        pageSize
      }
      data{
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
query getShopInfoById(
  $id: String!
  ) {
    getShopInfoById(id: $id) {
      data {
        description
        name
        tags
        id
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
