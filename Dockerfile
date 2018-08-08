FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install install

COPY . .
CMD ["npm", "start"]