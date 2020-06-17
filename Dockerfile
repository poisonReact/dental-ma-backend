
FROM ubuntu:16.04
FROM node:12


WORKDIR /app

RUN apt-get update && apt-get -y install cmake protobuf-compiler

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "start" ]