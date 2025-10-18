const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('body-parser');
const path = require('path');

const app = express();

// CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// BODY PARSER
app.use(json());
app.use(urlencoded({ extended: false }));

// ROUTES
require('./server/routes/index')(app);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write("<meta charset='utf-8'><style type='text/css'>body{padding:0px;margin:0px;}</style><div style='height:100vh; background:#333'></div>");
    res.end("<div style='width:100%; top:50%; position:absolute; text-align:center; font-size:20px; color:#ccc; transform:translateY(-50%); font-family:\"Arial\"'>¡Pasarela de Pagos Versátil!</div>");
});
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// STATIC FILES
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));

module.exports = app;