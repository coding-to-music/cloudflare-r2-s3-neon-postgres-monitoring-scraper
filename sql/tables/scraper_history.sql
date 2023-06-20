-- Create a new temporary table with the additional columns
CREATE TABLE temp_scraper_history (
  id            SERIAL PRIMARY KEY,
  line_content  VARCHAR(255),
  line_type     VARCHAR(10),
  line_num      NUMERIC,
  line_url      VARCHAR(255),
  first_dt      TIMESTAMP,
  latest_dt     TIMESTAMP,
  duration_secs NUMERIC,
  duration_txt  VARCHAR(30),
  site_name_txt VARCHAR(100),
  perm_link     BOOLEAN DEFAULT FALSE,
  departed      BOOLEAN DEFAULT FALSE
);

-- Migrate the existing data to the new table
INSERT INTO temp_scraper_history (line_content, line_type, line_num, line_url, first_dt, latest_dt)
SELECT line_content, line_type, line_num, line_url, first_dt, latest_dt
FROM scraper_history;

-- Drop the old table
DROP TABLE scraper_history;

-- Rename the new table to the original table name
ALTER TABLE temp_scraper_history RENAME TO scraper_history;

-- Update the sequence for the autoincrement column
SELECT setval(pg_get_serial_sequence('scraper_history', 'id'), COALESCE(MAX(id), 0) + 1, false)
FROM scraper_history;

CREATE UNIQUE INDEX idx_unique_line_content_url ON scraper_history (line_content, line_url)


-- DO $$
-- BEGIN
--     IF EXISTS (
--         SELECT 1
--         FROM information_schema.tables
--         WHERE table_schema = 'public'
--         AND table_name = 'scraper_history'
--     ) THEN
--         DROP TABLE scraper_history;
--         RAISE NOTICE 'Table scraper_history dropped.';
--     ELSE
--         RAISE NOTICE 'Table scraper_history does not exist.';
--     END IF;
-- END $$;

-- CREATE TABLE scraper_history (
--   id            SERIAL PRIMARY KEY,
--   line_content  VARCHAR(255),
--   line_type     VARCHAR(10),
--   line_num      NUMERIC,
--   line_url      VARCHAR(255),
--   first_dt      TIMESTAMP,
--   latest_dt     TIMESTAMP,
--   duration_secs NUMERIC,
--   perm_link     BOOLEAN DEFAULT FALSE,
--   departed      BOOLEAN DEFAULT FALSE
-- );

-- CREATE UNIQUE INDEX idx_unique_line_content_url ON scraper_history (line_content, line_url)
