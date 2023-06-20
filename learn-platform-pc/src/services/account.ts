import { GET_STUDENT, GET_STUDENTS } from "@/graphql/student";
import { GET_USER, GET_USERS, GET_USER_BYID } from "@/graphql/user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { TStudentsQuery, TUserQuery, TUsersQuery } from "@/utils/types";
import { useQuery } from "@apollo/client";

export const useUsers = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TUsersQuery>(GET_USERS, {
    variables: {
      page: {
        pageNum,
        pageSize,
      }
    },
  });

  return {
    loading,
    refetch,
    page: data?.getUsers.page,
    data: data?.getUsers.data,
  };
};

export const useUser = (id: string) => {
  if (id) {
    const { loading, data } = useQuery<TUserQuery>(GET_USER_BYID, {
      variables: {
        id,
      },
    });
    
    return {
      loading,
      data: data?.getUserById,
    };
  } else {
    return {
      data: {},
    };
  }
};

export const useStudents = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TStudentsQuery>(GET_STUDENTS, {
    variables: {
      page: {
        pageNum,
        pageSize,
      }
    },
  });

  return {
    loading,
    refetch,
    page: data?.getStudents.page,
    data: data?.getStudents.data,
  };
};

//   export const useUser = (id: string) => {
//     const { loading, data } = useQuery<TUserQuery>(GET_SHOP, {
//       variables: {
//         id,
//       },
//     });
//     return {
//       loading,
//       data: data?.getUserInfoById?.data,
//     };
//   };
