FROM node:latest
MAINTAINER Erick
COPY . /var/www
WORKDIR /var/www
RUN npm install 
ENTRYPOINT ["node", "index.js"]
EXPOSE 8000
