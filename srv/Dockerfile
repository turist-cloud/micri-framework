FROM mhart/alpine-node:12.12.0 AS base

FROM base AS build
RUN apk add --no-cache make
WORKDIR /build
COPY Makefile package.json tsconfig.json yarn.lock .yarnrc ./
RUN yarn install
ARG SRV_NAME
COPY ${SRV_NAME} ./${SRV_NAME}/
COPY lib ./lib/
RUN make $SRV_NAME

FROM base
ARG SRV_NAME
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /build/${SRV_NAME}/dist .

CMD ["/usr/bin/node", "index.js"]
