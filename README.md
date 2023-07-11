<h3 align="center">基于React+Antd+NestJs+MySql实现的全栈在线兴趣班学习平台</h3>
<p align="center">
	<a href="https://pnpm.io/" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-8.6.1-blue">
    </a>
	<a href="https://nodejs.org"  target="_blank">
      <img src="https://img.shields.io/badge/node-16.15.0-blue">
    </a>
    <a href="https://www.mysql.com/cn/downloads/" target="_blank">
    <img src="https://img.shields.io/badge/mysql-8.0.33-blue">
    </a>
	<a href="https://react.docschina.org/"  target="_blank">
      <img src="https://img.shields.io/badge/react-%5E18.2.0-blue">
    </a>
    <a href="https://nestjs.com/"  target="_blank">
      <img src="https://img.shields.io/badge/nestjs-%5E9.0.0-blue">
    </a>
        <a href="https://graphql.org/"  target="_blank">
      <img src="https://img.shields.io/badge/graphql-%5E16.6.0-blue">
    </a>
    <a href="https://typeorm.io/"  target="_blank">
      <img src="https://img.shields.io/badge/typeorm-%5E0.3.10-blue">
    </a>
    <a href="https://ant.design/index-cn"  target="_blank">
      <img src="https://img.shields.io/badge/antd-%5E5.5.0-blue">
    </a>
    <a href="https://mobile.ant.design/zh"  target="_blank">
      <img src="https://img.shields.io/badge/antd--mobile-%5E5.30.0-blue">
    </a>
    <a href="hhttps://dayjs.gitee.io/zh-CN/"  target="_blank">
      <img src="https://img.shields.io/badge/dayjs-%5E1.11.7-blue">
    </a>
</p>

安装 pnpm：
```
pnpm install
```
注意地：

> ^0.3.16 版本的 typeorm 会触发自动删除 id，会有一些 bug，暂时未知什么原因

## learn-platform-server （服务端）
启动本地后端服务：
```
pnpm dev
```

打开 graphql 可视化 api 调试：http://localhost:1024/graphql

生成 modules 中 api 文件模板：
```
pnpm temp
```
## learn-platform-pc （网页端）
启动本地 pc 端：
```
pnpm dev
```
打开 pc 端页面：http://localhost:1396

## learn-platform-mobile（手机端）

启动本地 mobile 端：
```
pnpm dev
```
打开 mobile 端页面：http://localhost:1398

手机上本地调试H5：

- 先配置vite的server：
```
  server: {
    host: '0.0.0.0', // 打开通过IP地址访问的开关
    port: 1398,
    https: false,
    open: true, // 自动打开浏览器
    cors: true, // 允许跨域
    hmr: true,
  },
```
- 配置代理的后端服务的uri为自己的ip地址：
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
- 安装一个谷歌二维码生成插件，开启二维码插件后把上面url的localhost部分换成本地ip地址
- 通过手机扫一扫，就可以打开mobile端，注意地，打不开可能需要关闭电脑防火墙。
