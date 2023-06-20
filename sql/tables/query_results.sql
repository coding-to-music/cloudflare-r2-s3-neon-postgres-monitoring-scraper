drop table query_results;

CREATE TABLE IF NOT EXISTS query_results (
    id SERIAL PRIMARY KEY,
    query_id INTEGER REFERENCES queries(id),
    row_count INTEGER,
    datetime TIMESTAMP NOT NULL,
    error TEXT
);

CREATE INDEX IF NOT EXISTS idx_query_results_query_id ON query_results (query_id);