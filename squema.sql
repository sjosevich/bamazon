DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(35) NOT NULL,
  department_name VARCHAR(35) NOT NULL,
  price decimal(10,2) NOT NULL,
  stock_quantity int(10) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM bamazon_db;