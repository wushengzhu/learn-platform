import { gql } from '@apollo/client';

export const GET_CARDS = gql`
query getCardRecordsForH5($page: PageInput!){
  getCardRecordsForH5(page: $page){
    code
    page {
      total
      pageNum
      pageSize
    }
    data {
      id
      startTime
      endTime
      buyTime
      status
      residueTime
      card {
        id
        name
        type
        validityDay
      }
      org {
        id
        name
      }
    }
    message
  }
}
`;

// 获取某个课程有用的消费卡
export const GET_USE_CARDS = gql`
  query getUseCardRecordsByCourse($courseId: String!){
    getUseCardRecordsByCourse(courseId: $courseId){
      code
      message
      data {
        id
        startTime
        endTime
        buyTime
        status
        residueTime
        card {
          id
          name
          type
        }
      }
      page {
        total
      }
    }
  }`;
