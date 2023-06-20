import My from "@/components/My";
import SystemMonitor from "@/components/SystemMonitor";
import Home from "@/containers/Home";
import PageNotFound from "@/containers/PageNotFound";
import Shop from "@/components/Shop";
import User from "@/components/User";
import { ROUTE_KEY } from "./menu";
import DataDict from "@/components/DataDict";
import NoShop from "@/containers/NoShop";
import Student from "@/components/Student";
import Account from "@/containers/Account";

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.SHOP]: Shop,
  [ROUTE_KEY.USER]: User,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.ACCOUNT]: Account,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.NO_SHOP]: NoShop,
  [ROUTE_KEY.DICTIONARY]: DataDict,
  [ROUTE_KEY.MONITOR]: SystemMonitor,
  [ROUTE_KEY.LOG]: SystemMonitor,
  [ROUTE_KEY.SETTING]: SystemMonitor,
  [ROUTE_KEY.PAGE_404]: PageNotFound,
};
