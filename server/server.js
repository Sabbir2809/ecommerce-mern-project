// Dependencies
const app = require('./app');
const connectDB = require('./src/config/db');
const { serverPort } = require('./src/secret');

// Listen
app.listen(serverPort, async () => {
  console.log(`Server is Running at http://localhost:${serverPort}`);
  await connectDB();
});
