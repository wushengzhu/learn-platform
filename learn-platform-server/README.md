<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
	<a href="https://pnpm.io/" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-8.6.1-blue">
    </a>
	<a href="https://nodejs.org"  target="_blank">
      <img src="https://img.shields.io/badge/node-16.15.0-blue">
    </a>
    <a href="https://www.mysql.com/cn/downloads/" target="_blank">
    <img src="https://img.shields.io/badge/mysql2-%5E3.3.1-blue">
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
    <a href="hhttps://dayjs.gitee.io/zh-CN/"  target="_blank">
      <img src="https://img.shields.io/badge/dayjs-%5E1.11.7-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/md5-%5E2.3.0-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/dotenv-%5E16.3.1-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/rxjs-%5E7.2.0-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/uuid-%5E9.0.0-blue">
    </a>
    <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/passport--jwt-%5E4.0.1-blue">
    </a>
   <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/ali--oss-%5E6.17.1-blue">
    </a>
     <a href="#"  target="_blank">
      <img src="https://img.shields.io/badge/plop-%5E3.1.2-blue">
    </a>
</p>
> 注意地，需要创建.env，模板参考.env.template

## 安装

```bash
$ pnpm install
```

## 生成 api 模板

```bash
$ pnpm temp
```

## 运行

```bash
# development
$ pnpm dev

```

## docker build

```
// 单镜像部署
docker build -t server:v1 .
```

## 注意地

> ^0.3.16 版本的 typeorm 会触发自动删除 id，会有一些 bug，暂时未知什么原因

## License

Nest is [MIT licensed](LICENSE).
