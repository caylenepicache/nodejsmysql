

var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:"root",
    password:"root",
    database:"bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readData();
  });

function readData() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

function promptUser(){
    inquirer.prompt([
        
    {
        type: "list",
        name: "userAction",
        message: "Select Action",
        choices: ["Id of item you would like to purchase", "How many units would you like to buy of this item?"]
    }
        ]).then(function(user) {
        
        // If the user guesses the password...
        if (user.userAction === "Id of item you would like to purchase") {
        //idItemMatch
        }
        
        
        // If the user doesn't guess the password...
        else if (user.userAction === "How many units would you like to buy of this item?") {
        
        //function
        
        }
    });
};

