# 在当前根目录下执行cmd，然后执行docker build -t mobile:v1 . 


# 容器的软件环境是什么，这里使用的是
# 这里使用的是 docker 的多阶段构建 大版本最好与本地一致
FROM node:18 AS builder
# 第一个 . 的意思是当前 dockerfile 所在的目录
# 第二个 . 的意思是当前启动的容器的根目录
COPY . .

RUN npm install pnpm -g  && pnpm install --registry=http://registry.npm.taobao.org && pnpm run build

FROM nginx:1.25.1

COPY --from=builder ./dist /var/www/learn-platform/pc
COPY nginx.conf /etc/nginx/conf.d/default.conf