import Home from "@/containers/Home";
import PageNotFound from "@/containers/PageNotFound";
import { ROUTE_KEY } from "./menu";

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: Home,
  [ROUTE_KEY.PAGE_404]: PageNotFound,
};