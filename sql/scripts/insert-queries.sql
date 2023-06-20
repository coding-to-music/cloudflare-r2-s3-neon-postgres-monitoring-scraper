-- Insert queries into the 'queries' table
INSERT INTO queries (query, title, active, summary, execution_order)
VALUES
    ('SELECT current_date;', 
    'Get Current Date', TRUE, 
    'Retrieve the current date from the database.', 1),

    ('update scraper_history set departed = true,   perm_link = false where id in ( select id from  scraper_history where latest_dt < (  select max(latest_dt)   from scraper_history  ))', 
    'Update departed boolean', TRUE, 
    'Update departed boolean in the scraper_history table', 2),

    ('update  scraper_history set perm_link = TRUE where id in (select id from  scraper_history where departed = FALSE and   perm_link = FALSE and   latest_dt = ( select max(latest_dt)  from scraper_history ) and   first_dt = ( select min(first_dt)  from scraper_history ))', 
    'Update perm_link boolean', TRUE, 
    'Update perm_link boolean in the scraper_history table', 3),

    ('UPDATE scraper_history SET duration_secs = EXTRACT(EPOCH FROM (latest_dt - first_dt)), duration_txt = TO_CHAR(latest_dt - first_dt, ''DD "day(s), " HH24:MI:SS'')', 
    'Update duration_txt, duration_secs', TRUE, 
    'Update duration_txt, duration_secs in the scraper_history table', 4),

    ('SELECT current_date;', 
    'Get Current Date', TRUE, 
    'Retrieve the current date from the database.', 5)
    ;
-- Add more INSERT statements for additional queries here

-- -- Insert queries into the 'queries' table
-- INSERT INTO queries (query, title, active, summary, execution_order)
-- VALUES
--     ('SELECT current_date;', 'Get Current Date', TRUE, 'Retrieve the current date from the database.', 1),
--     ('SELECT * FROM users;', 'Get All Users', FALSE, 'Fetch all user records from the ''users'' table.', 2),
--     ('INSERT INTO products (name, price) VALUES (''Phone'', 999);', 'Insert Product', TRUE, 'Insert a new product with name ''Phone'' and price 999 into the ''products'' table.', 3);
-- -- Add more INSERT statements for additional queries here
