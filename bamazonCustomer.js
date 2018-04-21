

var inquirer = require('inquirer');
var mysql = require('mysql');
var matchId;
var quantity;
var newQuantity;
//map database id to array index
//var resId;
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
        
            //id of product user wants
           matchId = user.itemId;
           //variable of user wants quantity
           quantity = user.userQuantity;
           
            
            idItemMatch();

    });
};

function idItemMatch(id) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    var resId = matchId - 1;

   // console.log("here in function iditemmatch " + matchId);
    //console.log("Item Id: " + res[resId].item_id);
    //console.log("Product Id: " + res[resId].product_name);
    //console.log("Stock Quantity: " + res[resId].stock_quantity)
    //console.log("User Quantity Wants: " + quantity);

    if(res[resId].stock_quantity < quantity) {
        console.log("Insufficient Quantity!");
        continueShopping();
        
    }
    else {
        newQuantity = res[resId].stock_quantity - quantity;
        console.log("\nYou ordered " + quantity + " of " + res[resId].product_name + ".")
        //console.log("New Quantity: " + newQuantity);
        updateQuantity();
    }

});
}

function updateQuantity() {
    //console.log("Updating quantity...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            stock_quantity: newQuantity
        },
        {
            item_id: matchId
        }
      ],
      function(err, res) {
        //console.log("Quantity updated!\n");
        continueShopping();
        // Call deleteProduct AFTER the UPDATE completes
      }
    );
  
    // logs the actual query being run
    //console.log("query sql: " + query.sql);


};

function continueShopping() {
    inquirer.prompt([
        {
            type: "list",
            name: "shopContChoice",
            message: "Would you like to order more products?",
            choices: ["Yes", "No"]
        }
        ])
        .then(function(user) {

            if(user.shopContChoice === "Yes") {
                readData();
            }

            else if(user.shopContChoice === "No") {
                connection.end();
                console.log("Thank you for shopping at Bamazon");
            }

})
};

