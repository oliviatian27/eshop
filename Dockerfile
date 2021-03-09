FROM node:14
WORKDIR /
COPY . .
RUN npm heroku-postbuild
CMD [ "npm", "start" ]
