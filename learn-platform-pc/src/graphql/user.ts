import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      tel
      avatar
      desc
      name
      account
      gender
    }
  }
`;

export const GET_USER_ACCOUNT = gql`
  mutation getUserByAccount($account: String!) {
    getUserByAccount(account: $account) {
      id
      account
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserInfo($id: String!,$params:UserInput!) {
    updateUserInfo(id: $id,params:$params) {
      code
      message
    }
  }
`;
