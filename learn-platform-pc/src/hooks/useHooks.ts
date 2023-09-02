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

export const useGetUser = () => {
    const { setStore } = useUserContext();
    const nav = useNavigate();
    const location = useLocation();
    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        onCompleted: (data) => {
            if (data.getUserInfo) {
                const { id, name, tel, avatar, account, gender, desc } =
                    data.getUserInfo;
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
                const userLoggedIn = true; // 根据你的后端响应数据来判断用户是否已登录
                const lastVisitedRoute = localStorage.getItem("lastVisitedRoute");
                if (location.pathname === "/login") {
                  if (userLoggedIn) {
                    if (lastVisitedRoute) {
                      nav(lastVisitedRoute);
                    } else {
                      nav("/");
                    }
                  }
                } else {
                  const routePath = location.pathname!=='/login'?location.pathname:'/';
                  localStorage.setItem("lastVisitedRoute", routePath);
                }
                return;
            }
            setStore({ refetchHandler: refetch });
        },
        onError: (error) => {
            if (error.message === "Unauthorized") {
                const routePath = location.pathname!=='/login'?location.pathname:'/';
                localStorage.setItem("lastVisitedRoute", routePath);
            }
            setStore({ refetchHandler: refetch });
        },
    });
    return { loading };
};
