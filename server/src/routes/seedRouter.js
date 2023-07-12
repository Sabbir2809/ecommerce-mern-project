// Dependencies
const seedRouter = require('express').Router();
const seedUser = require('../controllers/seedController');

// seed router
seedRouter.get('/seed/users', seedUser);

// export
module.exports = seedRouter;
