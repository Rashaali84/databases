/*
  user input: table name, column to order by, ASC or DSC
  logged data: all columns from the given table, sorted as instructed by the user input
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');
const db = new sqlite3.Database(DB_PATH);

var myArgs = process.argv.slice(2);
const userInput = { table: myArgs[0], input: myArgs[1], order: myArgs[2], };
const queryString = `select * from ${userInput.table} order by ${userInput.input} ${userInput.order}`;


db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});

