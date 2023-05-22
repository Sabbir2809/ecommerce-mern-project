// Dependencies
const app = require('./app');
const { serverPort } = require('./src/secret');

// Listen
app.listen(serverPort, () => {
  console.log(`Server is Running at http://localhost:${serverPort}`);
});
