FROM node:22.17.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["node", "src/index.js"]