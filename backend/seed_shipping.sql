INSERT INTO shipping_types (name, rate, min_days, max_days) VALUES 
('Standard', 5.00, 3, 5),
('Express', 15.00, 1, 2),
('Premium', 25.00, 0, 1)
ON DUPLICATE KEY UPDATE id=id;
