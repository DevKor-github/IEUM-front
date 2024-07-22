# Stage 1: Build
FROM node:16-alpine AS build
WORKDIR /app
ADD . /app/
RUN yarn install
RUN yarn run build
# Stage 2: Run
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]