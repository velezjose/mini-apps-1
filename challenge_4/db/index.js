const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'students',
  database: 'player_stats'
})

connection.connect((err) => {
  if (err) {
    console.log('some error occurred in connecting');
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;