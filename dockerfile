FROM node:20.14.0-alpine3.20

WORKDIR /usr/src/app

# COPY package.json ./
# COPY package-lock.json ./
COPY package*.json ./

RUN yarn install

# Copy the rest of the files
COPY . .

EXPOSE 3000