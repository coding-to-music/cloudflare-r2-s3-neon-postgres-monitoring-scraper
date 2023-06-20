CREATE TABLE IF NOT EXISTS queries (
        id SERIAL PRIMARY KEY,
        query TEXT NOT NULL,
        title TEXT NOT NULL,
        active BOOLEAN NOT NULL,
        summary TEXT,
        execution_order INTEGER
    );

CREATE INDEX IF NOT EXISTS idx_queries_active ON queries (active);

-- ALTER SEQUENCE queries_id_seq RESTART WITH 1;
