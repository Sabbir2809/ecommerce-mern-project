// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const createHttpError = require('http-errors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const userRouter = require('./src/routes/userRouter');
const seedRouter = require('./src/routes/seedRouter');
const { errorResponse } = require('./src/helper/responseController');

// Security Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
const reteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: 'Too many Requests from this IP. Please try again later',
});
app.use(reteLimiter);
app.use(morgan('dev'));

// Application Level Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ urlencoded: true, extended: true, limit: '50mb' }));

// health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'All is Well!' });
});

// routes
app.use('/api', seedRouter);
app.use('/api', userRouter);

// ERROR: client error handling
app.use((req, res, next) => {
  next(createHttpError(404, 'Route Not Found'));
});
// ERROR: server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

// export
module.exports = app;
