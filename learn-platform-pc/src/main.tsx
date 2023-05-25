import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';
import * as dayjs from 'dayjs';
import { client } from './utils/apollo.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css';
import './index.css';
import 'virtual:windi.css';

import { ROUTE_CONFIG } from './routes/index.ts';
import PageNotFound from './containers/PageNotFound/index.tsx';

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
)
