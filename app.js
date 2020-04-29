const express = require('express');
const path = require('path');
require('dotenv').config();
const fetch = require('node-fetch');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

// livereload
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// app
const app = express();

app.use(connectLivereload());

// routes
const weatherRouter = require('./routes/weather');

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// static folder
app.use(express.static(path.join(__dirname, 'public')));


// api handling
// weather handling
app.use('/weather', weatherRouter);
