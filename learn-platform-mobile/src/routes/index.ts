import Register from '../containers/Register';
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
    key: 'register',
    path: '/register',
    element: Register,
    title: '注册',
  },
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '首页',
  },
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '首页',
  },
  {
    key: '404',
    path: '*',
    element: PageNotFound,
    title: '404',
  },
];
