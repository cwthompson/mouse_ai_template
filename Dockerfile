FROM node:8.10.0

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install
RUN npm install -g nodemon

COPY ./ .
#CMD node app.js
CMD [ "nodemon", "-L", "app.js" ]

EXPOSE 3000