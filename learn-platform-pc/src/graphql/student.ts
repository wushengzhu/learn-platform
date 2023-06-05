import { gql } from "@apollo/client";

export const GET_STUDENT = gql`
query getStudentInfoByGuard {
  getStudentInfoByGuard {
    id
    tel
    account
    name
    avatar
  }
}
`
