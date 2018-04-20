

var inquirer = require('inquirer');
var mysql = require('mysql');
var matchId;
var quantity;

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
        
            matchId = user.itemId - 1;
            quantity = user.userQuantity
            
            console.log(matchId);
            console.log(quantity);

            idItemMatch();

    });
};

function idItemMatch(id) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    console.log("here in function iditemmatch " + matchId);

    console.log(res[matchId].item_id);
    console.log(res[matchId].product_name);
});
}
