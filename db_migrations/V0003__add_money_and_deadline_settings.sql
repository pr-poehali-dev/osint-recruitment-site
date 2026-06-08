INSERT INTO settings (key, value) VALUES
('deadline_date', ''),
('pay_once', '2600000'),
('pay_monthly', '210000'),
('pay_federal', '400000'),
('pay_year_total', '5120000')
ON CONFLICT (key) DO NOTHING;