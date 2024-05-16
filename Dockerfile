FROM node:16-alpine

WORKDIR /app

ADD . /app/

RUN yarn install

RUN yarn run build

EXPOSE 3031

ENTRYPOINT yarn run start:prod