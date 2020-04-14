FROM node:10.15.1

RUN mkdir app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD npm start