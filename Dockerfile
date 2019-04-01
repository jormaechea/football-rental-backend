FROM node:8-alpine

RUN apk update

RUN npm install -g serverless

WORKDIR /var/www/football-rental-server

CMD node
