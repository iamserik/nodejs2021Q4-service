FROM node:16.13-alpine
WORKDIR /app
COPY package.json .
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
EXPOSE "${PORT}"
CMD ["node", "./dist/bundle.js"]