const express = require('express');
const router = express.Router();
const apiHandler = require('../apiHandler');
const patientRoute = require('./api/patientRoutes');


router.use('/patient', patientRoute);


module.exports = router;
