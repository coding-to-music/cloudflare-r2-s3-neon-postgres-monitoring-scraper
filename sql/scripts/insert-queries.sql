-- Insert queries into the 'queries' table
INSERT INTO queries (query, title, active, summary, execution_order)
VALUES
    ('SELECT current_date;', 'Get Current Date', TRUE, 'Retrieve the current date from the database.', 1),
    ('SELECT * FROM users;', 'Get All Users', FALSE, 'Fetch all user records from the ''users'' table.', 2),
    ('INSERT INTO products (name, price) VALUES (''Phone'', 999);', 'Insert Product', TRUE, 'Insert a new product with name ''Phone'' and price 999 into the ''products'' table.', 3);
-- Add more INSERT statements for additional queries here

