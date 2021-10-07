# Stage 1
FROM node:14.18-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build

# Stage 2
FROM node:14.18-alpine

ARG APP_HOME=/usr/src/app

WORKDIR ${APP_HOME}

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=build ${APP_HOME}/dist ./dist

CMD ["yarn", "start:prod"]
