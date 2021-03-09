FROM node:15.11.0
WORKDIR /
COPY . .
RUN npm install
RUN npm run heroku-postbuild
CMD [ "npm", "start" ]
