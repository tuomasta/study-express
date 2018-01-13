FROM node:latest
MAINTAINER  Tuomas Talus
WORKDIR /var/www/api
RUN npm install nodemon -g
EXPOSE 4200
ENTRYPOINT ["nodemon", "--inspect=0.0.0.0:5858", "dist/serve.js" ]