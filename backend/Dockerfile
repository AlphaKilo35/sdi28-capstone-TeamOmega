FROM node:20-alpine

RUN mkdir -p /backend

WORKDIR /backend

COPY . /backend

RUN npm install
  #assuming node.js / react
#RUN npm install -g nodemon

EXPOSE 3000
  #Default express server port

CMD ["npm", "run", "start-dev"]
  #Break up command in package.json
  # [ "npm", "run", "dev"] / ["npm", "start"] / ["npm", "run"]