# syntax=docker/dockerfile:1
FROM node:latest

WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

