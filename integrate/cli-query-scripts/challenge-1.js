/*
  user input: employee first name
  logged data: that employee's last name
*/
// Include process module 
const process = require('process');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH);

//add the arg process 
var myArgs = process.argv.slice(2);

const userInput = { input: myArgs[0] };

const queryString = `select lastname from employee where firstname="${userInput.input}"`;

db.all(queryString, (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(rows);
  }

  db.close();
});

