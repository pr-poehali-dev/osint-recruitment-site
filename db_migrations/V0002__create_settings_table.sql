CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(50) PRIMARY KEY,
    value TEXT NOT NULL DEFAULT ''
);

INSERT INTO settings (key, value) VALUES ('applications_count', '1247')
ON CONFLICT (key) DO NOTHING;