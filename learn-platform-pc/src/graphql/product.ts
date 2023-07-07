import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
    query getProductById($id: String!) {
        getProductById(id: $id) {
            code
            message
            data {
                id
                limitBuyNumber
                name
                type
                coverUrl
                bannerUrl
                desc
                status
                originalPrice
                stock
                preferentialPrice
                cards {
                    id
                    name
                    type
                    time
                    validityDay
                    course {
                        name
                        id
                    }
                }
            }
        }
    }
`;

export const GET_PRODUCTS = gql`
    query getProducts($page: PageInput!, $name: String) {
        getProducts(page: $page, name: $name) {
            code
            message
            page {
                total
                pageNum
                pageSize
            }
            data {
                id
                limitBuyNumber
                name
                coverUrl
                bannerUrl
                desc
                status
                originalPrice
                stock
                preferentialPrice
            }
        }
    }
`;

export const SAVE_PRODUCT = gql`
    mutation saveProduct($params: PartialProductInput!, $id: String) {
        saveProduct(params: $params, id: $id) {
            code
            message
        }
    }
`;

export const DEL_PRODUCT = gql`
    mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
            code
            message
        }
    }
`;
