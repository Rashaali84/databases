/*
  user input: table name, column name, search string, number of entries
  logged data: return a given number of rows matching the search parameter
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH);

var myArgs = process.argv.slice(2);
const userInput = { tbl: myArgs[0].trim(), col: myArgs[1].trim(), searchTex: myArgs[2].trim(), noEnteries: myArgs[3].trim() };
const queryString =
  `SELECT count(*) as totRows
FROM  ${ userInput.tbl}
WHERE ${ userInput.col} in (
  SELECT ${ userInput.col}
FROM ${ userInput.tbl}
WHERE ${ userInput.col} like '%${userInput.searchTex}%' limit ${Number(userInput.noEnteries)})`
console.log(queryString);
db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});
