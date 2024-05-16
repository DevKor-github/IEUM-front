FROM node:16-alpine

WORKDIR /app

ADD . /app/

RUN yarn install

RUN yarn run build

ENTRYPOINT yarn run start:prod