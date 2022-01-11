FROM node:16.13-alpine
WORKDIR /app
COPY package.json .
RUN npm install --no-optional
COPY . .
EXPOSE "${PORT}"
CMD npm build && node ./dist/bundle.js