FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "src/index.js"]
