import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import {
  QUERY_TEACHER, GET_TEACHERS, COMMIT_TEACHER, DELETE_TEACHER,
} from '@/graphql/teacher';
import { TBaseTeacher, TTeacherQuery, TTeachersQuery } from '@/utils/types';
import { DEFAULT_PAGE_SIZE } from '../utils/constants';

export const useTeachers = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const {
    loading, error, data, refetch,
  } = useQuery<TTeachersQuery>(
    GET_TEACHERS,
    {
      variables: {
        page: {
          pageNum,
          pageSize,
        },
      },
    },
  );

  return {
    loading,
    error,
    refetch,
    page: data?.getTeachers.page || {
      pageSize,
      pageNum,
      total: 0,
    },
    data: data?.getTeachers.data,
  };
};

export const useTeacher = (id: string) => {
  const { loading, error, data } = useQuery<TTeacherQuery>(
    QUERY_TEACHER,
    {
      skip: !id,
      variables: {
        id,
      },
    },
  );

  return {
    loading,
    error,
    data: data?.getTeacherInfo.data,
  };
};

export const useEditTeacherInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_TEACHER);

  const handleEdit = async (
    id: string,
    params: TBaseTeacher,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitTeacherInfo.code === 200) {
      message.success(res.data.commitTeacherInfo.message);
      callback(true);
      return;
    }
    message.error(res.data.commitTeacherInfo.message);
  };

  return [handleEdit, loading];
};

export const useDeleteTeacher = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DELETE_TEACHER);

  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    if (res.data.deleteTeacher.code === 200) {
      message.success(res.data.deleteTeacher.message);
      callback();
      return;
    }
    message.error(res.data.deleteTeacher.message);
  };

  return [delHandler, loading];
};
