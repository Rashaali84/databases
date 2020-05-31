/*
  user input: name of table, name of column, search string
  logged data: all entries in the table who's column matches the search
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH);



// hint:  `... LIKE '%${userInput.searchString}%'`
var myArgs = process.argv.slice(2);
const userInput = { table: myArgs[0].trim(), input: myArgs[1].trim(), searchString: myArgs[2].trim(), };
const queryString = `select * from ${userInput.table} where ${userInput.input} like '%${userInput.searchString}%'`;

db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});
