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
                    addInventory();
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
        //console.log('--------------------------------------------------------------------------------------------------')
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

function addInventory() {
    
}