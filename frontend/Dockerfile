FROM node:latest as build

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# Silent clean install of npm
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
# add app
COPY . /app/

# Build production
RUN npm run build
RUN npm install -g serve

## Start the app on port 3000
CMD serve -s build -l 3000