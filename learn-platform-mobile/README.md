<h3 align="center">移动端</h3>
<p align="center">
	<a href="https://pnpm.io/" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-8.6.1-blue">
    </a>
	<a href="https://nodejs.org"  target="_blank">
      <img src="https://img.shields.io/badge/node-16.15.0-blue">
    </a>
	<a href="https://react.docschina.org/"  target="_blank">
      <img src="https://img.shields.io/badge/react-%5E18.2.0-blue">
    </a>
        <a href="https://graphql.org/"  target="_blank">
      <img src="https://img.shields.io/badge/graphql-%5E16.6.0-blue">
    </a>
    <a href="https://mobile.ant.design/zh"  target="_blank">
      <img src="https://img.shields.io/badge/antd--mobile-%5E5.30.0-blue">
    </a>
    <a href="https://dayjs.gitee.io/zh-CN/"  target="_blank">
      <img src="https://img.shields.io/badge/dayjs-%5E1.11.7-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/md5-%5E2.3.0-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/lodash-%5E4.17.21-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/vite-%5E4.3.2-blue">
    </a>
</p>

## 启动本地 mobile 端：

```
pnpm dev
```

打开 mobile 端页面：http://localhost:1398

手机上本地调试 H5：

- 先配置 vite 的 server：

```
  server: {
    host: '0.0.0.0', // 打开通过IP地址访问的开关
    port: 1398,
    https: false,
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
  },
```

- 配置代理的后端服务的 uri 为自己的 ip 地址：

```
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
  // uri: 'http://localhost:1024/graphql',
  uri: `${本地ip地址}:1024/graphql`, // 可手机上调试的本地ip后端地址
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

```

- 手机与电脑处于同一个局域网下
- 安装一个谷歌二维码生成插件，开启二维码插件后把上面 url 的 localhost 部分换成本地 ip 地址
- 通过手机扫一扫，就可以打开 mobile 端，注意地，打不开可能需要关闭电脑防火墙。

## 单元测试:jest

- 安装包：pnpm i vitest jsdom @testing-library/react -D
- vitest 文档：https://vitest.dev/api/
- react-testing-library 文档：https://testing-library.com/docs/react-testing-library/api
