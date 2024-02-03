const express = require('express');
const router = express.Router();
const {weatherController} = require('../controllers');

router.post('/weather-info', weatherController.weatherInfo)

module.exports = router;