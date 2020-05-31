/*
  user input: column name, starting index, number of entries
  logged data: a specific number artist names, starting at a specific row number
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH);

var myArgs = process.argv.slice(2);
const userInput = { col: myArgs[0].trim(), stIndex: myArgs[1].trim(), noEnteries: myArgs[2].trim() };
const finalIndex = Number(userInput.stIndex) + Number(userInput.noenteries);
const queryString = `select count(${userInput.col}) from artist where ( artistid >=${userInput.stIndex} and artistid <=${finalIndex})`;

//another solution 
//const queryString = `select * from artist LIMIT ${Number(userInput.stIndex)}, ${Number(userInput.noEnteries)}`;

db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});
