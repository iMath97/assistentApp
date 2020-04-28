const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/geolocation/:latlon', async (req, res) => {
    const latlon = req.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

router.get('/country/:input', async (req, res) => {
    const input = req.params.input.split(',');
    const city = input[0];
    const country = input[1];
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
});

module.exports = router;