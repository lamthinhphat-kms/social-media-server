FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start:dev" ]