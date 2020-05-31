/*
  user input: column name, table name
  logged data: the first 20 unique values for the given column, in the given table
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH);

var myArgs = process.argv.slice(2);
const userInput = { col: myArgs[0].trim(), tble: myArgs[1].trim() };
const queryString = `select distinct ${userInput.col} from ${userInput.tble} LIMIT 20`;

db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});
