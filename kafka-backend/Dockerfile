FROM node:10.15.1

RUN mkdir app

WORKDIR /app

COPY package.json .

RUN npm install

COPY kafka_2.11-1.1.0 .

RUN  kafka_2.11-1.1.0

COPY . .

EXPOSE 3001

CMD npm start