// Dependencies
require('dotenv').config();

// Secret Key
const serverPort = process.env.SERVER_PORT || 8080;
const mongodbURL = process.env.MONGODB_ATLAS_URL;
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || './public/images/users/default.png';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL;

// exports
module.exports = {
  serverPort,
  mongodbURL,
  defaultImagePath,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
};
