FROM node:20-alpine

RUN mkdir -p /frontend

WORKDIR /frontend

COPY . /frontend

RUN npm install
  #assuming node.js / react

EXPOSE 5173
  #Default node server port

CMD ["npm", "run", "dev"]
  #Break up command in package.json
  # [ "npm", "run", "dev"] / ["npm", "start"] / ["npm", "run"]