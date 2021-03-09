FROM node:14
WORKDIR /
COPY . .
RUN npm install
RUN npm run heroku-postbuild
CMD [ "npm", "start" ]
