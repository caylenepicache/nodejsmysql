# nodejsmysql


## Demo
Link for an example of the homework: https://youtu.be/ZZVzF4IpB8g


## What is this application?
This application utilizes MySQL and node.js in creating something similar to Amazon that has products, prices, inventory, and departments. This activity has two javascript files.

## Prerequisites
To run this application
```
git clone https://github.com/caylenepicache/nodejsmysql.git
cd nodejsmysql
npm install
node bamazonCustomer.js
```

## What to expect

### Bamazon Customer
BamazonCustomer utilizes a MySQL Database called bamazon with the columns that include an item id, product name, department name, price, and stock quantity.From there we are able to populate the data with mock products and prompt the user one of two things. We can ask the user what item what they would like to buy and how many units of the product do they want. From there, the amount the user wanted needs to be adjusted respectively to the database and so if the user calls the list of items again, it would reflect the change. This also notes if a user requests for too much of one product, it would console an insufficient quantity.


### Bamazon Manager
In bamazonManager, a switch function was utilized to address four separate functions in the menu. One to display the products, two to display products with a low inventory of less than 5, adding more stock to a product, and adding a new product. These will all be updated in MySql accordingly and with each call to the console, the data reflects to the changes accordingly.