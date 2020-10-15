require('dotenv').config();

const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;
const routes = require('./routes/server');

const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

// catch all other routes
app.use((req, res) => {
    res.status(404).json({
        message: '404 - Not Found',
        status: 404
    });
});

// handling errors
app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({
        error: error.message,
        status: 500
    });
});

app.listen(port, () => {
    console.log('running')
});