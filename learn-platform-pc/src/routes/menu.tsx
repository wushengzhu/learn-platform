import { HomeOutlined } from "@ant-design/icons";
import * as React from "react";

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: "home",
  MY: "my",
  PAGE_404: "404",
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: "home",
    name: "首页",
    icon: <HomeOutlined rev={undefined} />,
  },
  [ROUTE_KEY.MY]: {
    path: "my",
    name: "个人信息",
    icon: <HomeOutlined rev={undefined} />,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: "*",
    name: "404",
    hideInMenu: true,
  },
};

export const routes = Object.values(ROUTE_CONFIG).map((key: any) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteKey = (key: string) => ROUTE_CONFIG[key];
