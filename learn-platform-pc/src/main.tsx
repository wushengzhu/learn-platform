import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Layout } from 'antd';
import { ApolloProvider } from '@apollo/client';
import * as dayjs from 'dayjs';
import { client } from './utils/apollo';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css';
import './index.css';
import 'virtual:windi.css';

import { ROUTE_CONFIG } from './routes/index';
import PageNotFound from './containers/PageNotFound/index';
import UserInfo from './components/UserInfo';

dayjs.locale('zh-cn');
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}><BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/" element={<Layout />}>
            {ROUTE_CONFIG.map((item: any) => (
              <Route
                key={item.key}
                path={item.path}
                element={<item.element />} />
            ))}
          </Route>
          <Route
            path="*"
            element={<PageNotFound />} />
        </Routes>
      </UserInfo>
    </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>
)
