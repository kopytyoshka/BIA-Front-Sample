FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g @ionic/cli
RUN npm install
COPY ./ /app/
EXPOSE 8100
ENTRYPOINT ionic serve --prod --external