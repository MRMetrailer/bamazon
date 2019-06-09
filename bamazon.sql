DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Superstar Shoes", "Shoes", 69.99, 201),
("Sombrero", "Hats", 9.79, 4384),
("Magnetic Screen Door", "Outdoors", 24.24, 53),
("Tiger Robe", "Clothing", 39.74, 17),
("Blue Sports Drink", "Grocery", 1.50, 1819),
("Filet Mignon", "Grocery", 11.11, 2),
("Left Handed Scissors", "Tools", 12.63, 101),
("Mariah Carey Tickets", "Concerts", 209.97, 148),
("Gold Watch", "Accessories", 2055.51, 3),
("Golf Clubs", "Sports", 1234.56, 28)