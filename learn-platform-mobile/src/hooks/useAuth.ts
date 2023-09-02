import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, connectFactory } from '@/utils/contextFactory';
import { IStudent } from '../utils/types';
import { GET_STUDENT_INFO } from '../graphql/user';

const KEY = 'studentInfo';
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetStudent = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const { loading, refetch } = useQuery<{
    getStudentInfoByGuard: IStudent;
  }>(GET_STUDENT_INFO, {
    onCompleted: (data) => {
      if (data.getStudentInfoByGuard) {
        const { id, name, tel, avatar, openid } = data.getStudentInfoByGuard;
        setStore({
          id,
          name,
          tel,
          avatar,
          openid,
          refetchHandler: refetch,
        });
        const userLoggedIn = true; // 根据你的后端响应数据来判断用户是否已登录
        const lastVisitedRoute = localStorage.getItem("mobile.lastVisitedRoute");
        if (location.pathname === "/login") {
          if (userLoggedIn) {
            if (lastVisitedRoute) {
              nav(lastVisitedRoute);
            } else {
              nav("/");
            }
          }
        } else {
          const routePath = location.pathname !== '/login' ? location.pathname : '/';
          localStorage.setItem("mobile.lastVisitedRoute", routePath);
        }
        return;
        return;
      }
      setStore({ refetchHandler: refetch });
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        const routePath = location.pathname!=='/login'?location.pathname:'/';
        localStorage.setItem("mobile.lastVisitedRoute", routePath);
    }
    setStore({ refetchHandler: refetch });
    },
  });
  return { loading };
};
