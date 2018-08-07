FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install install --production

COPY . .
CMD ["npm", "start"]