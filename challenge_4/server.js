const express = require('express');
const app = express();
const host = 'localhost';
const port = 3000;

app.use(express.static('public'));

app.listen(port, host, () => `Listening to requests on port ${host}:${port}.`);