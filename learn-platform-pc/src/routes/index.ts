import Home from "../containers/Home";
import Login from "../containers/Login";
import PageNotFound from "../containers/PageNotFound";

export const ROUTE_CONFIG = [
  {
    key:'login',
    path:'/login',
    element:Login,
    name:'登录',
    hideInMenu:true
  },
  {
    key:'home',
    path:'/',
    element:Home,
    name:'首页'
  },
  {
    key:'404',
    path:'/404',
    element:PageNotFound,
    name:'404'
  }
]
