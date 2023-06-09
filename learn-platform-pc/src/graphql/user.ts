import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      tel
      avatar
      name
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
