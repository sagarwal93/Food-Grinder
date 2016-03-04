FROM node:latest
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm build

EXPOSE 8090
CMD npm run start
