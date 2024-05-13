FROM node:16-alpine

RUN mkdir -p /develop && chown "node:node" /develop
WORKDIR /develop

COPY . .

RUN npm install

RUN ls

EXPOSE 8080
CMD npm run start