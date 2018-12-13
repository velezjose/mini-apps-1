const express = require('express');
const app = express();
const host = '127.0.0.1';
const port = 3000;


app.use(express.static('public'));

app.listen(3000, host, () => console.log('Server listening on ', host, ':', port));