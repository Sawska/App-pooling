FROM node:14

WORKDIR /app

COPY package*.json ./

RUN  npm i --lockfile-version 3
RUN  npm install bcrypt

COPY . .

EXPOSE 3000

CMD ["npm", "run", "deploy"]
