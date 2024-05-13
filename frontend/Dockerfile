FROM node:16-alpine

RUN mkdir -p /develop && chown "node:node" /develop
WORKDIR /develop

COPY . .

RUN npm install

EXPOSE 3000
CMD npm start