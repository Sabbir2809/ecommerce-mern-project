// Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./src/routes/userRouter');

// Middleware
app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
const reteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many Requests from this IP. Please try again later',
});
app.use(reteLimiter);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'All is Well!' });
});

app.use('/api/users', userRouter);

// ERROR - client error handling
app.use((req, res, next) => {
  // res.status(404).json({ message: 'Route Not Found' });
  next(createError(404, 'Route Not Found'));
});

// ERROR - server error handling
app.use((err, req, res, next) => {
  // console.error(err.stack);
  // res.status(500).send('Something broke!');
  return res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
