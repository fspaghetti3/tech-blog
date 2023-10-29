// routes/index.js
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/routes', userRoutes);


module.exports = router;