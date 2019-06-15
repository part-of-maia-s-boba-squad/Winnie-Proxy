require('newrelic');

const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.use('/API/restaurant', proxy('http://localhost:3003/API/restaurant'));

app.get('/restaurant/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public') + '/index.html');
});

app.listen(port, () => console.log('Listening on Port:', port));

// pm2 start -i -1 server/server.js --node-args="--max-old-space-size=8192"
