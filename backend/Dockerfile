FROM node:10.15.1

RUN mkdir app

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3001

CMD npx sequelize-cli db:migrate

CMD npm start