FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN npm install yarn

RUN yarn install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]