INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing') ON DUPLICATE KEY UPDATE id=id;

INSERT INTO products (name, description, price, category_id, stock) VALUES 
('Laptop', 'High performance laptop', 1000.00, 1, 10),
('T-Shirt', 'Cotton t-shirt', 20.00, 2, 50)
ON DUPLICATE KEY UPDATE id=id;
