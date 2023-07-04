import { gql } from "@apollo/client";

export const GET_COURSE = gql`
    query getCourseById($id: String!) {
        getCourseById(id: $id) {
            code
            message
            data {
                id
                name
                desc
                group
                baseAbility
                limitNumber
                duration
                reserveInfo
                refundInfo
                otherInfo
                reducibleTime {
                    week
                    orderTime {
                        startTime
                        endTime
                        key
                    }
                }
            }
        }
    }
`;

export const GET_COURSES = gql`
    query getCourses($page: PageInput!, $name: String) {
        getCourses(page: $page, name: $name) {
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
                desc
                group
                baseAbility
                limitNumber
                duration
                reserveInfo
                refundInfo
                otherInfo
            }
        }
    }
`;

export const SAVE_COURSE = gql`
    mutation saveCourse($params: PartialCourseInput!, $id: String) {
        saveCourse(params: $params, id: $id) {
            code
            message
        }
    }
`;

export const DEL_COURSE = gql`
    mutation deleteCourse($id: String!) {
        deleteCourse(id: $id) {
            code
            message
        }
    }
`;
