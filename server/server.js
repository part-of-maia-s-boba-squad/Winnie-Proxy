const express = require('express');
const path = require('path');
proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));
app.use('/API/restaurant', proxy('http://localhost:3003/API/restaurant'));

app.get('/restaurant/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public') + '/index.html');
});

app.listen(port, () => console.log('Listening on Port:', port));
