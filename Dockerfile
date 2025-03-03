FROM node:18-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --omit=dev

RUN chown -R node:node /home/node/app

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]