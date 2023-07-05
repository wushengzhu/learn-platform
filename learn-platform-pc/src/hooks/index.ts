import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { ROUTE_CONFIG, ROUTE_KEY, getRouteKey, routes } from "@/routes/menu";

/**
 * 页面跳转
 * @returns
 */
export const useGoTo = () => {
    const nav = useNavigate();
    const back = () => nav(-1);
    const go = (pageKey?: string, params?: Record<string, string | number>) => {
        if (!pageKey) {
            nav("/");
            return;
        }

        const route = getRouteKey(pageKey);
        if (route && route.path) {
            if (!params) {
                nav(route.path);
                return;
            }

            // /page:id => /page/id
            const url = route.path.replace(
                /\/:(\w+)/g,
                (exp: string, exp1: string) => `/${params[exp1]}`
            );
            nav(`/${url}`);
        }
    };
    return { back, go };
};

/**
 * 获取当前匹配的路由
 * @returns
 */
export const useMatchedRoute = () => {
    const r = useLocation();
    const route = useMemo(
        () =>
            routes.find((item: any) => matchPath(`/${item.path}`, r.pathname)),
        [r.pathname]
    );
    return route;
};

export const useIsShopRoute = () => {
    const curRoute = useMatchedRoute();
    if (curRoute?.path === ROUTE_CONFIG[ROUTE_KEY.SHOP].path) {
        return true;
    }
    return false;
};
