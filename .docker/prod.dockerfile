# stage 0: build app
FROM node:latest
WORKDIR /temp
COPY . .
RUN npm install

# TODO: mongoose have broken rollup
#RUN npm run bundle --silent

# stage 1: run app
FROM node:latest
MAINTAINER  Tuomas Talus
WORKDIR /var/www/api

# change this when rollup works again
#COPY --from=0 /temp/dist/bundle.js .
COPY --from=0 /temp/dist/ ./dist
COPY --from=0 /temp/node_modules ./node_modules

EXPOSE 4200
ENTRYPOINT [ "node", "dist/serve.js"]
#ENTRYPOINT [ "node", "bundle.js"]