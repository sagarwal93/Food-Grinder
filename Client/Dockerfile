FROM node:latest
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm build

EXPOSE 8080
CMD node node_modules/webpack-dev-server/bin/webpack-dev-server
