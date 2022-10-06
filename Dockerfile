FROM node:10.15.0 as react-build

WORKDIR /app
COPY . ./

RUN npm install
RUN npm remove webpack -g
RUN npm i webpack@4.29.6 --save-dev
RUN npm rebuild node-sass
RUN npm run build
RUN npm install -g serve

EXPOSE 8080/tcp
CMD ["node", "app.js"]