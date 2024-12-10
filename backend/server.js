const server = require('./src/app.js');
require('dotenv').config({path: '../.env'});

const PORT = 3000 //${EXPRESS_PORT}

server.listen(PORT, '0.0.0.0', () => console.log(`Express server listening on ${PORT}`))