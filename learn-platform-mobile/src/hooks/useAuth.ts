import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, connectFactory } from '@/utils/contextFactory';
import { IStudent } from '../utils/types';
import { GET_STUDENT_INFO } from '../graphql/user';
import { AUTH_TOKEN } from '@/utils/constants';

const KEY = 'studentInfo';
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

const token = localStorage.getItem(AUTH_TOKEN);

export const useGetStudent = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const checkRoute = () => {
    // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      if (token) {
        nav(`/`);
      } else {
        nav(`/login?shopUrl=${location.pathname}`);
      }
    }
  };
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
        // 当前在登录页面，且已经登录了，那就直接跳到首页
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
      checkRoute();
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
      checkRoute();
    },
  });
  return { loading };
};
