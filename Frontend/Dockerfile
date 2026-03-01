<<<<<<< HEAD
# syntax=docker/dockerfile:1
=======
>>>>>>> 098ed18f682c6551a3b8a00144c25ebefafe25fb
FROM node:latest

WORKDIR /app

<<<<<<< HEAD
# Copy package.json first for caching
COPY package*.json ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install
=======
COPY package.json ./

RUN npm install
>>>>>>> 098ed18f682c6551a3b8a00144c25ebefafe25fb

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

