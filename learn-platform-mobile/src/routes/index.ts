import Register from '../containers/Register';
import Home from '../containers/Home';
import Login from '../containers/Login';
import PageNotFound from '../containers/PageNotFound';
import { ROUTE_KEY } from './menu';
import My from '@/containers/My';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.REGISTER]: Register,
  [ROUTE_KEY.LOGIN]: Login,
  [ROUTE_KEY.PAGENOTFOUND]: PageNotFound,
};
