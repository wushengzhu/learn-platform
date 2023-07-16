import { gql } from '@apollo/client';

export const AUTO_CREATE_SCHEDULE = gql`
mutation autoCreateSchedule($startDay: String!, $endDay: String!) {
  autoCreateSchedule(startDay: $startDay, endDay: $endDay) {
    code
    message
  }
}
`;

export const GET_SCHEDULES = gql`
query getSchedules($today: String!) {
  getSchedules(today: $today){
    code
    message
    data {
      id
      startTime
      endTime
      limitNumber
      scheduleRecords {
        id
        status
        student {
          id
          name
          avatar
        }
      }
      course {
        id
        name
        coverUrl
        teachers {
          id
          name
          photoUrl
        }
      }
    }
    page {
      total
    }
  }
}
`;
