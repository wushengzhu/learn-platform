import { UserOutline } from 'antd-mobile-icons';
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
  PRODUCTINFO: 'product',
  BUY: 'buy',
  EDITINFO: 'editInfo',
  MY_COURSE: 'myCourse',
  ORDER_COURSE: 'orderCourse',
  MY_CARD: 'myCard',
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
  [ROUTE_KEY.EDITINFO]: {
    path: 'editInfo',
    name: '编辑个人信息',
    isMenu: false,
  },
  [ROUTE_KEY.MY_COURSE]: {
    path: 'myCourse',
    name: '我的课程',
    isMenu: false,
  },
  [ROUTE_KEY.ORDER_COURSE]: {
    path: 'orderCourse',
    name: '预约课程',
    isMenu: false,
  },
  [ROUTE_KEY.MY_CARD]: {
    path: 'myCard',
    name: '我的消费卡',
    isMenu: false,
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
  [ROUTE_KEY.PRODUCTINFO]: {
    path: 'product/:id',
    name: '商品详情',
    isMenu: false,
  },
  [ROUTE_KEY.BUY]: {
    path: 'buy/:id',
    name: '购买信息',
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
