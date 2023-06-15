import { gql } from "@apollo/client";

export const GET_DICTS = gql`
  query getDicts($page: PageInput!) {
    getDicts(page: $page) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        dictName
        dictCode
        isCanUse
        parentId
        modCode
      }
    }
  }
`;

export const GET_DICT = gql`
  query getDictInfoById($id: String!) {
    getDictInfoById(id: $id) {
      data {
        id
        dictName
        dictCode
        isCanUse
        parentId
        modCode
      }
      code
      message
    }
  }
`;

export const COMMIT_DICT = gql`
  mutation commitDict($params: DictInput!, $id: String!) {
    commitDict(params: $params, id: $id) {
      code
      message
    }
  }
`;

export const DEL_DICT = gql`
  mutation deleteDict($id: String!) {
    deleteDict(id: $id) {
      code
      message
    }
  }
`;
