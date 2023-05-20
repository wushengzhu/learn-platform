import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN'
import App from './App.tsx'
import 'antd/dist/reset.css';
import './index.css';
import 'virtual:windi.css';
import { client } from './utils/apollo.ts';

dayjs.locale('zh-cn');
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
