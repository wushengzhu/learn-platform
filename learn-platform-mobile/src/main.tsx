import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import * as dayjs from 'dayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { client } from './utils/apollo';
import 'dayjs/locale/zh-cn';
import './App.module.less';
import './theme.css';
import 'virtual:windi.css';
import { ROUTE_COMPONENT } from './routes';
import { routes } from './routes/menu';
import Login from './containers/Login';
import App from './App';
import Register from './containers/Register';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<App />}>
            {routes.map((item: any) => {
              const Component = ROUTE_COMPONENT[item.key];
              return (
                <Route
                  key={item.key}
                  path={item.path}
                  element={<Component />}
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
