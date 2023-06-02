import { gql } from "@apollo/client";

export const SEND_CODE_MSG = gql`
  mutation sendCodeMsg($tel: String!) {
    sendCodeMsg(tel: $tel) {
      code
      message
    }
  }
`;
export const TEL_LOGIN = gql`
  mutation login($tel: String!, $code: String!) {
    login(tel: $tel, code: $code) {
      code
      message
      data
    }
  }
`;

export const ACCOUNT_LOGIN = gql`
  mutation studentLogin($account: String!, $password: String!) {
    studentLogin(account: $account, password: $password) {
      code
      message
      data
    }
  }
`;

export const STUDENT_REGISTER = gql`
  mutation studentRegister(
    $account: String!
    $password: String!
    $tel: String!
    $avatar: String!
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
