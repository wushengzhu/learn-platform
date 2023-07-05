import { gql } from "@apollo/client";

export const GET_CARD = gql`
    query getCardById($id: String!) {
        getCardById(id: $id) {
            code
            message
            data {
                id
                name
                time
                type
                validityDay
                course
                shop
            }
        }
    }
`;

export const GET_CARDS = gql`
    query getCards($page: PageInput!, $courseId: String!, $name: String) {
        getCards(page: $page, courseId: $courseId, name: $name) {
            code
            message
            page {
                total
                pageNum
                pageSize
            }
            data {
                id
                name
                time
                type
                validityDay
                course
                shop
            }
        }
    }
`;

export const SAVE_CARD = gql`
    mutation saveCard($params: CardInput!, $courseId: String!, $id: String) {
        saveCard(params: $params, courseId: $courseId, id: $id) {
            code
            message
        }
    }
`;

export const DEL_CARD = gql`
    mutation deleteCard($id: String!) {
        deleteCard(id: $id) {
            code
            message
        }
    }
`;
