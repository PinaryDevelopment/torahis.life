FROM node:lts-alpine3.12 as build

WORKDIR /app
COPY ./package*.json /app/
RUN npm install @angular/cli@^10.0.0\
  && npm install --production

COPY . /app

RUN npm run build:prod -- --outputPath=./dist;

FROM nginx:stable-alpine as final
EXPOSE 80

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d
