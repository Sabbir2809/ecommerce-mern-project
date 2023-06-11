// Dependencies
require('dotenv').config();

// Secret Key
const serverPort = process.env.SERVER_PORT || 8080;
// MongoDB
const mongodbURL = process.env.MONGODB_ATLAS_URL;
// image
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || './public/images/users/default.png';

// exports
module.exports = {
  serverPort,
  mongodbURL,
  defaultImagePath,
};
