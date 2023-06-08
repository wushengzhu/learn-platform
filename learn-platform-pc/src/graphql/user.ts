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
