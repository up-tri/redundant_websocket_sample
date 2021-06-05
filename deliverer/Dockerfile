FROM node:14.17

RUN npm i -g @nestjs/cli

WORKDIR /app/api-server
COPY . /app/api-server

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start"]