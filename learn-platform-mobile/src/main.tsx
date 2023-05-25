import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import * as dayjs from 'dayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import PageNotFound from './containers/PageNotFound';
import { ROUTE_CONFIG } from './routes';
import { client } from './utils/apollo';
import 'dayjs/locale/zh-cn';
import './index.css';
import 'virtual:windi.css';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {ROUTE_CONFIG.map((item) => (
            <Route
              key={item.key}
              path={item.path}
              element={<item.element />} />
          ))}
          <Route
            path="*"
            element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>
);
