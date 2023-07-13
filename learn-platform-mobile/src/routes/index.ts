import Register from '../containers/Register';
import Home from '../containers/Home';
import Login from '../containers/Login';
import PageNotFound from '../containers/PageNotFound';
import { ROUTE_KEY } from './menu';
import My from '@/containers/My';
import ShopInfo from '@/containers/ShopInfo';
import ProductInfo from '@/containers/ProductInfo';
import Buy from '@/containers/Buy';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.REGISTER]: Register,
  [ROUTE_KEY.LOGIN]: Login,
  [ROUTE_KEY.SHOPINFO]: ShopInfo,
  [ROUTE_KEY.PRODUCTINFO]: ProductInfo,
  [ROUTE_KEY.BUY]: Buy,
  [ROUTE_KEY.PAGENOTFOUND]: PageNotFound,
};
