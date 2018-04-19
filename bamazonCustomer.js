

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

      //loop through the table
      for(var i = 0; i<res.length;i++){
        console.log("\nID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        //console.log('--------------------------------------------------------------------------------------------------')
        //console.log(res);
      }
    //prompt user after bamazon_db displays
    promptUser();

    });
  }

function promptUser(){
    inquirer.prompt([
        
        {
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many items do you want to order?",
            name: "userQuantity"
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

function idItemMatch() {

}
