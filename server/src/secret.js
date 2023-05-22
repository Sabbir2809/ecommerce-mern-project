// Dependencies
require('dotenv').config();

// Secret Key
const serverPort = process.env.SERVER_PORT || 8080;

// exports
module.exports = { serverPort };
