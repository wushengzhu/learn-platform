import My from "@/components/My";
import SystemMonitor from "@/components/SystemMonitor";
import Home from "@/containers/Home";
import PageNotFound from "@/containers/PageNotFound";
import { ROUTE_KEY } from "./menu";

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.DICTIONARY]: Home,
  [ROUTE_KEY.MONITOR]: SystemMonitor,
  [ROUTE_KEY.LOG]: SystemMonitor,
  [ROUTE_KEY.SETTING]: SystemMonitor,
  [ROUTE_KEY.PAGE_404]: PageNotFound,
};
