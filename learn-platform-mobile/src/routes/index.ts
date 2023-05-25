import Home from '../containers/Home';
import Login from '../containers/Login';
import PageNotFound from '../containers/PageNotFound';

export const ROUTE_CONFIG = [
  {
    key: 'login',
    path: '/login',
    element: Login,
    title: '登录',
  },
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '首页',
  },
  {
    key: '404',
    path: '/404',
    element: PageNotFound,
    title: '404',
  },
];
