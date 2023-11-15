FROM node:16-bullseye

WORKDIR /index

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]