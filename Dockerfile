FROM node:16-alpine

WORKDIR /app

ADD . /app/

RUN yarn install

RUN yarn run build

EXPOSE 3000

ENTRYPOINT yarn start