FROM node:latest
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm install webpack -g
RUN npm build

EXPOSE 8080
CMD webpack-dev-server
