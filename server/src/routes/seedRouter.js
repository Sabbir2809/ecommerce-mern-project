// Dependencies
const seedUser = require('../controllers/seedController');
const seedRouter = require('express').Router();

// seed router
seedRouter.get('/seed/users', seedUser);

// export
module.exports = seedRouter;
