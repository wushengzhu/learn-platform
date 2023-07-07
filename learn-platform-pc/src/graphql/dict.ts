import { gql } from "@apollo/client";

export const GET_DICTS = gql`
    query getDicts(
        $page: PageInput!
        $name: String
        $code: String
        $parentId: String
    ) {
        getDicts(page: $page, name: $name, code: $code, parentId: $parentId) {
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

export const GET_DICT_PARENTDID = gql`
    query getDictsByParentId($parentId: String!) {
        getDictsByParentId(parentId: $parentId) {
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
    mutation saveDict($params: DictInput!, $id: String!) {
        saveDict(params: $params, id: $id) {
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
