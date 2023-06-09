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
export const GET_STUDENTS = gql`
query getStudents($page: PageInput!) {
  getStudents(page: $page) {
    code
    message
    page {
      total
      pageNum
      pageSize
    }
    data {
      id
      account
      avatar
      tel
      name
      desc
      gender
    }
  }
}
`;

export const COMMIT_STUDENT = gql`
  mutation commitStudent($params: StudentInput!, $id: String) {
    commitStudent(params: $params, id: $id) {
      code
      message
    }
  }
`;