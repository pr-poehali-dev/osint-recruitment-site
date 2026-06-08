-- Клики по кнопкам (аналитика)
CREATE TABLE IF NOT EXISTS button_clicks (
    id SERIAL PRIMARY KEY,
    source VARCHAR(80) NOT NULL DEFAULT 'unknown',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_clicks_source ON button_clicks(source);
CREATE INDEX IF NOT EXISTS idx_clicks_created ON button_clicks(created_at DESC);

-- Блог / новости
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Заявки на обратный звонок
CREATE TABLE IF NOT EXISTS callbacks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL DEFAULT '',
    phone VARCHAR(50) NOT NULL,
    preferred_time VARCHAR(100) NOT NULL DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_callbacks_status ON callbacks(status);

-- Документы / сертификаты
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
);

-- Начальные посты блога
INSERT INTO blog_posts (title, excerpt, body, sort_order) VALUES
('Как проходит обучение с нуля', 'Рассказываем, как новички осваивают специальность OSINT за 2 недели интенсивной подготовки.', 'Полная программа подготовки включает теорию и практику под руководством опытных наставников. Обучение бесплатное, с первого дня начисляется довольствие.', 1),
('Военная ипотека: реальные условия', 'Разбираем накопительно-ипотечную систему и сколько государство перечисляет на жильё.', 'Участие в НИС позволяет приобрести жильё за счёт государства. Первоначальный взнос и платежи покрываются из бюджета.', 2),
('Один день в OSINT-подразделении', 'От утреннего брифинга до вечернего доклада — как устроен рабочий день аналитика.', 'Работа проходит в тыловых районах, по сменному графику, в комфортных условиях с современным оборудованием.', 3);

-- Начальные документы
INSERT INTO documents (title, description, sort_order) VALUES
('Лицензия на деятельность', 'Официальное разрешение на ведение деятельности подразделения.', 1),
('Гарантии государства', 'Документ, подтверждающий социальные гарантии военнослужащим.', 2);