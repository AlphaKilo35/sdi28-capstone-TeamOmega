FROM node:18-alpine

#RUN mkdir -p /frontend

WORKDIR /frontend

COPY . /frontend

#RUN rm -rf node_modules package-lock.json
RUN npm install
#RUN npm install rollup@latest --save-dev

EXPOSE 5173
  #Default node server port

CMD ["npm", "run", "dev"]
  #Break up command in package.json
  # [ "npm", "run", "dev"] / ["npm", "start"] / ["npm", "run"]