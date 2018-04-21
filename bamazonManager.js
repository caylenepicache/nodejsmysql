var inquirer = require('inquirer');
var mysql = require('mysql');
var matchId;
var userQuantity;
var newQuantity;

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
    promptUser();
});

function promptUser(){
    inquirer.prompt([     
        {
            type: "list",
            name: "userAction",
            message: "\nSelect Action",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Leave Bamazon"]
        }
        ]).then(function(user) {

            switch(user.userAction) {
                case "View Products for Sale":
                    readData();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    readDatawithoutPrompt();
                    break;

                case "Add New Product":
                    newProduct();
                    break;
                
                case "Leave Bamazon":
                    connection.end();
                    console.log("You are now leaving Bamazon");
            };

    });
};


function readData() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      //loop through the table
      for(var i = 0; i<res.length;i++){
        console.log("\nID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        //console.log(res);
      }

    //prompt user after bamazon_db displays
      promptUser();
    });
};

function lowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5',
    function(err, res) {
        if (err) throw err;

//-------------------------------

        if (res.length === 0) {
            console.log("There are currently no items with Low Inventory!")
            promptUser();

        } else {

            console.log("Items on Low Inventory");
            for (var i = 0; i < res.length; i++){
                console.log("\nID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            }
        promptUser();
        }
    });
}

function readDatawithoutPrompt() {
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    //loop through the table
    for(var i = 0; i<res.length;i++){
      console.log("\nID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    }
    addInventory();
});

}

function addInventory() {

    inquirer.prompt([
        
        {
            type: "input",
            message: "What is the ID of the item you would like to add inventory to?",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many items do you want to add?",
            name: "userQuantity"
        }
        ]).then(function(user) {
        
            //id of product user wants
           matchId = user.itemId;
           //variable of user wants quantity
           quantity = user.userQuantity;

           idItemMatch();
    });
}

function idItemMatch(id) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    var resId = matchId - 1;

   console.log("here in function iditemmatch " + matchId);
    console.log("Item Id: " + res[resId].item_id);
    console.log("Product Id: " + res[resId].product_name);
    console.log("Stock Quantity: " + res[resId].stock_quantity)
    console.log("User Quantity Wants: " + quantity);

        newQuantity = parseInt(res[resId].stock_quantity) + parseInt(quantity);
        console.log("\nYou added " + quantity + " of " + res[resId].product_name + ".")
        //console.log("New Quantity: " + newQuantity);
        updateInventory();

});
}

function updateInventory() {
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
              console.log("Quantity updated!\n");
              // Call deleteProduct AFTER the UPDATE completes
            }
          );
        
          // logs the actual query being run
          //console.log("query sql: " + query.sql);
      
readData();
}

function newProduct() {
    inquirer.prompt([{
        name: 'newItem',
        type: 'text',
        message: "Enter the name of the product that you would like to add: "
    }, {
        name: 'newDept',
        type: 'text',
        message: "Enter the name of the department of this product: "
    }, {
        name: 'newPrice',
        type: 'text',
        message: "Enter the price of the product: "
    }, {
        name: 'newStock',
        type: 'text',
        message: 'Enter the stock quantity to be added into inventory: '
    }]).then(function(user) {
        //CREATES AN OBJECT WITH ALL OF THE ITEMS ADDED
        var item = {
                product_name: user.newItem,
                department_name: user.newDept,
                price: user.newPrice,
                stock_quantity: user.newStock
            }
            //INSERTS THE NEW ITEM INTO THE DATABASE
        connection.query('INSERT INTO products SET ?', item,
            function(err) {
                if (err) throw err;
                console.log(item.product_name + ' has been added successfully to your inventory.');
                promptUser();
            });
    });
}
