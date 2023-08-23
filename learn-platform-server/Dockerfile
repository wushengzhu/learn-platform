FROM node:18 AS builder

COPY . .

RUN npm install pnpm -g --registry=http://registry.npm.taobao.org && pnpm install --registry=http://registry.npm.taobao.org && pnpm run build


FROM node:18

WORKDIR /opt/app

COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist

# server定义的端口
EXPOSE 1024

ENV NODE_ENV=production

CMD ["node", "dist/main"]