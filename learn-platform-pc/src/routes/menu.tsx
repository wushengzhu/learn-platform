import { AlertOutlined, FileExclamationOutlined, HomeOutlined, ReadOutlined, SettingOutlined, ShopOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import * as React from "react";

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
  emoji?: string;
}

export const ROUTE_KEY = {
  HOME: "home",
  SHOP: "shop",
  USER: "user",
  STUDENT: "student",
  ACCOUNT: "account",
  MY: "my",
  PAGE_404: "404",
  NO_SHOP: "noshop",
  DICTIONARY: "dict",
  MONITOR: "monitor",
  SETTING: "setting",
  LOG: "log",
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: "home",
    name: " 首页",
    icon: <HomeOutlined rev={undefined} />,
  },
  [ROUTE_KEY.MY]: {
    path: "my",
    name: "个人信息",
    hideInMenu: true,
    icon: <UserOutlined rev={undefined} />,
  },
  [ROUTE_KEY.SHOP]: {
    path: "shop",
    name: "门店管理",
    hideInMenu: true,
    icon: <ShopOutlined rev={undefined} />,
  },
  [ROUTE_KEY.SHOP]: {
    path: "noshop",
    name: "门店管理",
    hideInMenu: true,
  },
  [ROUTE_KEY.USER]: {
    path: "user",
    name: "用户管理",
    hideInMenu: true,
    icon: <UserOutlined rev={undefined} />,
  },
  [ROUTE_KEY.STUDENT]: {
    path: "student",
    name: "学员管理",
    hideInMenu: true,
    icon: <TeamOutlined rev={undefined} />,
  },
  [ROUTE_KEY.ACCOUNT]: {
    path: "account",
    name: "账户管理",
    icon: <TeamOutlined rev={undefined} />,
  },
  [ROUTE_KEY.DICTIONARY]: {
    path: "dict",
    name: "字典管理",
    icon: <ReadOutlined rev={undefined} />,
  },
  [ROUTE_KEY.MONITOR]: {
    path: "monitor",
    name: "系统监控",
    icon: <AlertOutlined rev={undefined} />,
  },
  [ROUTE_KEY.LOG]: {
    path: "log",
    name: "系统日志",
    icon: <FileExclamationOutlined rev={undefined} />,
  },
  [ROUTE_KEY.SETTING]: {
    path: "setting",
    name: "系统配置",
    icon: <SettingOutlined rev={undefined} />,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: "*",
    name: "404",
    hideInMenu: true,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key: any) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteKey = (key: string) => ROUTE_CONFIG[key];
