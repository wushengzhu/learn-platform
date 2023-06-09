import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext, connectFactory } from "../utils/contextFactory";
import { GET_USER } from "../graphql/user";
import { IUser } from "../utils/types";
import { AUTH_TOKEN } from "@/utils/constants";

const KEY = "userInfo";
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext<IUser>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

const token = localStorage.getItem(AUTH_TOKEN);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const checkRoute = () => {
    // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
    if (location.pathname !== "/login") {
      if (token) {
        nav(`/`);
      } else {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    }
  };
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, name, tel, avatar,account,gender,desc } = data.getUserInfo;
        setStore({
          id,
          name,
          tel,
          avatar,
          account,
          gender,
          desc,
          refetchHandler: refetch,
        });
        // 当前在登录页面，且已经登录了，那就直接跳到首页
        if (location.pathname === "/login") {
          nav("/");
        }
        return;
      }
      setStore({ refetchHandler: refetch });
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
