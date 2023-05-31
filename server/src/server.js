// Dependencies
const app = require('./app');
const connectDB = require('./config/db');
const { serverPort } = require('./secret');

// Listen
app.listen(serverPort, async () => {
  console.log(`Server is Running at http://localhost:${serverPort}`);
  await connectDB();
});
