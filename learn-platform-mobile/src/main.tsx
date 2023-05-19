import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import App from './App';
// import 'dayjs/locale/zh-cn';
// import * as dayjs from 'dayjs';
// import 'antd/dist/reset.css';
import './index.css';
import { client } from './utils/apollo';

// dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ConfigProvider>,
);
