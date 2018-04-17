DROP DATABASE IF EXISTS bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (

	item_id integer(10) auto_increment,
    product_name  varchar(100) not null,
    department_name varchar(30) not null,
    price integer(10),
    stock_quantity integer(100),
    PRIMARY KEY (item_id)

);


insert into products(product_name, department_name, price, stock_quantity)
values ("Bialetti 1168 Moka Express Export Espresso Maker", "Home and Kitchen", 34.89, 200),
("Modern Hanging Planter Vase, Geometric Wall Decor Container", "Patio, Lawn, and Garden", 19.99, 147),
("Stila Stay All Day Waterproof Liquid Eye Line", "Luxury Beauty", 22.00, 381),
("Miamica 3-Piece Packing Cube Set", "Beauty and Personal Care", 12.00, 76),
("Web Design with HTML, CSS, JavaScript and jQuery Set", "Books", 29.55, 130),
("Audio-Technica ATN3600L Replacement Stylus for AT-LP60", "Home Audio and Theater", 15.99, 203),
("Nature Made Melatonin 3 mg Tablets Value Size 240 Ct", "Health and Personal Care", 7.79, 213),
("Burton Tinder Backpack, Rancher Stripe Print", "Sports and Outdoors", 74.95, 58),
("I hope this reaches her in time", "Books", 3.58, 66),
("Adagio Teas 16 oz. ingenuiTEA Bottom-Dispensing Teapot", "Home and Kitchen", 18.76, 145)