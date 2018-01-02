# stage 0: build app
FROM node:latest
WORKDIR /temp
COPY . .
RUN npm install
RUN npm run bundle
COPY dist/bundle.js /api/bundle.js

# stage 1: run app
FROM node:latest
MAINTAINER  Tuomas Talus
WORKDIR /user/api
COPY --from=0 /api .
EXPOSE 4200
CMD [ "node", "bundle.js"]