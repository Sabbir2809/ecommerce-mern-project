const seedUser = require('../controllers/seedController');
const seedRouter = require('express').Router();

seedRouter.get('/users', seedUser);

module.exports = seedRouter;
