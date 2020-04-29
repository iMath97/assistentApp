// set deploy or dev
const status = "deploy" //deploy when deploying and dev when local


const express = require('express');
const path = require('path');

// app
const app = express();

if(status == "dev"){
    require('dotenv').config();
    const livereload = require('livereload');
    const connectLivereload = require('connect-livereload');
    const fetch = require('node-fetch');

    // livereload
    var liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    app.use(connectLivereload());
}


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
