FROM node:latest
MAINTAINER  Tuomas Talus
WORKDIR /user/api
COPY package.json .
RUN npm install --quiet
COPY dist dist
#RUN ls
#RUN ls dist/ -R
EXPOSE 4200
CMD [ "npm", "run", "serve"]