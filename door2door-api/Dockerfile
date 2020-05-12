FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "start"]
