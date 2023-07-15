import { gql } from '@apollo/client';

export const STUDENT_REGISTER = gql`
  mutation studentRegister(
    $account: String!
    $password: String!
    $tel: String
    $avatar: String
  ) {
    studentRegister(
      account: $account
      password: $password
      tel: $tel
      avatar: $avatar
    ) {
      code
      data
      message
    }
  }
`;

export const USER_REGISTER = gql`
  mutation userRegister(
    $account: String!
    $password: String!
    $tel: String!
    $avatar: String!
  ) {
    userRegister(
      account: $account
      password: $password
      tel: $tel
      avatar: $avatar
    ) {
      code
      data
      message
    }
  }
`;

export const STUDENT_LOGIN = gql`
  mutation studentLogin($account: String!, $password: String!) {
    studentLogin(account: $account, password: $password) {
      code
      message
      data
    }
  }
`;

export const GET_STUDENT_INFO = gql`
  query getStudentInfoByGuard {
    getStudentInfoByGuard {
      name
      account
      id
      avatar
      tel
      openid
    }
  }
`;

export const COMMIT_STUDENT_INFO = gql`
  mutation commitStudentInfo($params: StudentInput!) {
    commitStudentInfo(params: $params) {
      code
      message
    }
  }
`;
