const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

// This is the same thing as:  app.use('/', express.static('client'));
// It serves all files in the client/ directory.
app.use(express.static('client'));
app.use(bodyParser.json({type: '*/*'}));

app.post('/', (req, res) => {
  debugger;
  // res.write(req.body);
  res.send();
});

app.listen(port, () => console.log(`Listening on port ${port}.`));