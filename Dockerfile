FROM node:lts-alpine
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN apk update && apk upgrade
RUN apk add --no-cache sqlite
# RUN npm ci && mv node_modules ../
RUN npm install && mv node_modules ../
COPY . .
EXPOSE ${APP_PORT}
RUN chown -R node /usr/src/app
USER node
RUN npm run build
CMD npm run migration:run && npm run start