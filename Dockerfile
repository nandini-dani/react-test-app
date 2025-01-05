FROM node:latest AS build

WORKDIR /ToDoList

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /ToDoList/dist /usr/share/nginx/html

EXPOSE 80