-- Заявки
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    specialty VARCHAR(150) NOT NULL DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    note TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);

-- Вакансии
CREATE TABLE IF NOT EXISTS vacancies (
    id SERIAL PRIMARY KEY,
    specialty VARCHAR(50) NOT NULL DEFAULT 'osint',
    level VARCHAR(30) NOT NULL DEFAULT 'без опыта',
    icon VARCHAR(50) NOT NULL DEFAULT 'Briefcase',
    title VARCHAR(150) NOT NULL,
    descr TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    salary VARCHAR(50) NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
);

-- FAQ
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
);

-- Галерея
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    caption VARCHAR(200) NOT NULL DEFAULT '',
    sort_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT true
);

-- Начальные вакансии
INSERT INTO vacancies (specialty, level, icon, title, descr, tags, salary, sort_order) VALUES
('osint','опыт','Search','OSINT-аналитик','Разведка по открытым источникам. Формирование досье объектов, мониторинг цифровых следов, подготовка аналитических докладов.','Аналитика,OSINT,Отчётность','от 210 000 ₽',1),
('it','опыт','Monitor','IT-специалист','Поддержка защищённой инфраструктуры. Настройка VPN-туннелей, шифрование каналов, администрирование серверов.','Безопасность,Сети,Linux','от 230 000 ₽',2),
('bpla','без опыта','Plane','Оператор БпЛА','Управление беспилотниками для воздушной разведки. Аэрофотосъёмка объектов, корректировка данных. Обучение с нуля.','БпЛА,Разведка,Навигация','от 220 000 ₽',3),
('logistics','без опыта','Truck','Водитель-логист','Тыловое обеспечение подразделения. Перевозка личного состава и грузов, техническое обслуживание автопарка.','Логистика,Кат. C,Тыл','от 195 000 ₽',4),
('osint','без опыта','Rss','Мониторинг СМИ','Непрерывный мониторинг открытых СМИ, Telegram-каналов и соцсетей. Формирование ежедневных информационных дайджестов.','Медиа,Мониторинг,OSINT','от 200 000 ₽',5),
('it','опыт','Server','Системный администратор','Поддержка серверного оборудования. Управление защищёнными каналами связи, резервное копирование, контроль доступа.','Серверы,Сети,Защита','от 225 000 ₽',6);

-- Начальные FAQ
INSERT INTO faq (question, answer, sort_order) VALUES
('Кто может подать заявку?','Граждане РФ от 18 до 49 лет. Для IT-специальностей — до 55 лет. Воинский опыт необязателен.',1),
('Какие требования к кандидатам?','Гражданство РФ, отсутствие серьёзных судимостей, прохождение медкомиссии. Специфика зависит от должности.',2),
('Где проходит формирование?','Формирование и подготовка проходят в г. Чита — столице Забайкальского края.',3),
('Где проходит служба?','Служба проходит в Донецке и Мариуполе.',4),
('Нужно ли покупать экипировку?','Нет. Вся необходимая экипировка и техника предоставляются подразделением.',5),
('Как подать заявку?','Оставьте имя и телефон в форме на сайте — специалист свяжется в течение 24 часов.',6),
('Как осуществляется отбор?','Телефонное интервью → встреча с представителем → медкомиссия → оформление документов.',7),
('Когда начинаются выплаты?','Единовременная — в течение первого месяца. Ежемесячное довольствие — с первого дня службы.',8);