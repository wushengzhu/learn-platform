import {
  CANCEL_SUBSCRIBE,
  GET_CAN_SUBSCRIBE_COURSES,
  GET_SCHEDULES_BY_COURSE,
  GET_SCHEDULE_RECORD,
  SUBSCRIBE_COURSE,
} from '@/graphql/schedule';
import {
  TBaseQuery,
  TShopsQuery,
  TScheduleRecordsQuery,
  TSchedulesQuery,
} from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';

// 获取我的可以约的课程
export const useCanSubscribeCourses = () => {
  const { loading, data } = useQuery<TShopsQuery>(GET_CAN_SUBSCRIBE_COURSES);

  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};

// 获取我的可以约的某个课程的课程表
export const useSchedulesByCourse = (courseId: string) => {
  const { loading, data } = useQuery<TSchedulesQuery>(GET_SCHEDULES_BY_COURSE, {
    variables: {
      courseId,
    },
  });

  return {
    loading,
    data: data?.getSchedulesByCourse.data,
  };
};

// 立即预约课程
export const useSubscribeCourse = () => {
  const [subscribe, { loading }] = useMutation<TBaseQuery>(SUBSCRIBE_COURSE);

  const subscribeHandler = async (scheduleId: string, cardId: string) => {
    const res = await subscribe({
      variables: {
        scheduleId,
        cardId,
      },
    });
    return res.data?.subscribeCourse;
  };

  return {
    subscribe: subscribeHandler,
    loading,
  };
};

// 获取我的课程表记录
export const useScheduleRecords = () => {
  const { data, refetch, loading } = useQuery<TScheduleRecordsQuery>(
    GET_SCHEDULE_RECORD,
    {
      variables: {
        page: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    },
  );

  return { data: data?.getScheduleRecords.data, loading, refetch };
};

// 立即取消预约课程
export const useCancelSubscribeCourse = () => {
  const [cancel, { loading }] = useMutation<TBaseQuery>(CANCEL_SUBSCRIBE);

  const cancelHandler = async (scheduleRecordId: string) => {
    const res = await cancel({
      variables: {
        scheduleRecordId,
      },
    });
    return res.data?.cancelSubscribeCourse;
  };

  return {
    cancel: cancelHandler,
    loading,
  };
};
