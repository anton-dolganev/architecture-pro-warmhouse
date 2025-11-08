FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY server.js .

EXPOSE 8081

CMD ["npm", "start"]