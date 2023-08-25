FROM node:lts-alpine
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE ${APP_PORT}
RUN chown -R node /usr/src/app
USER node
RUN npm run build
CMD ["npm", "run", "start"]
