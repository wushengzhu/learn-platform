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

export const GET_USER_BYID = gql`
    query getUserById($id: String!) {
        getUserById(id: $id) {
            id
            tel
            avatar
            desc
            name
            account
            gender
            password
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUserInfo($id: String!, $params: UserInput!) {
        updateUserInfo(id: $id, params: $params) {
            code
            message
        }
    }
`;

export const GET_USERS = gql`
    query getUsers($page: PageInput!) {
        getUsers(page: $page) {
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
