FROM node:20-alpine

#RUN mkdir -p /frontend

WORKDIR /frontend

COPY . /frontend

#RUN rm -rf node_modules package-lock.json
RUN npm install

EXPOSE 5173
  #Default node server port

CMD ["npm", "run", "dev", "--", "--host"]
  #Break up command in package.json
  # [ "npm", "run", "dev"] / ["npm", "start"] / ["npm", "run"]