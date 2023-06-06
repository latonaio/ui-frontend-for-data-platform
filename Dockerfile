FROM node:17.6-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG ENV_TARGET
ENV ENV_TARGET ${ENV_TARGET}

RUN npm run build:${ENV_TARGET}

CMD ["npm", "run", "start"]
