-- ecommerce.sql (SQL base para e-commerce)
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  stock INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- shipping types
CREATE TABLE IF NOT EXISTS shipping_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rate DECIMAL(5,2) NOT NULL, -- porcentaje, ej 15.00 => 15%
  min_days INT,
  max_days INT
);

-- carts (or orders)
CREATE TABLE IF NOT EXISTS carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  status ENUM('pending','completed','cancelled') DEFAULT 'pending',
  subtotal DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  shipping_type_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_type_id) REFERENCES shipping_types(id)
);

-- cart items
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL, -- price at time of purchase
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- addresses
CREATE TABLE IF NOT EXISTS addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  departamento VARCHAR(255),
  localidad VARCHAR(255),
  calle VARCHAR(255),
  numero VARCHAR(50),
  esquina VARCHAR(255),
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);

-- payments (fictitious record)
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT,
  method VARCHAR(50),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE
);
