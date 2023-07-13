import { AppOutline, UserOutline } from 'antd-mobile-icons';
import * as React from 'react';
import courseSvg from '../assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  isMenu?: boolean;
  hideHeader?: boolean;
  emoji?: string;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  REGISTER: 'register',
  LOGIN: 'login',
  PAGENOTFOUND: 'pagenotfound',
  SHOPINFO: 'shop',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '',
    name: '精品课程',
    icon: courseSvg,
    isMenu: true,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    isMenu: true,
    icon: <UserOutline />,
  },
  [ROUTE_KEY.REGISTER]: {
    path: 'register',
    name: '注册',
    isMenu: false,
  },
  [ROUTE_KEY.SHOPINFO]: {
    path: 'shop/:id',
    name: '门店详情',
    isMenu: false,
  },
  [ROUTE_KEY.LOGIN]: {
    path: 'login',
    name: '登录',
    isMenu: false,
  },
  [ROUTE_KEY.PAGENOTFOUND]: {
    path: '404',
    name: '404',
    isMenu: false,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key: any) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteKey = (key: string) => ROUTE_CONFIG[key];
