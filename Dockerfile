FROM node:10

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm i --quiet

COPY ./ .

CMD [ "nodemon", "-L", "app.js" ]

EXPOSE 3000