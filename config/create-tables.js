const pool = require("./db");

const tables = [
  `CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        code VARCHAR(255)
    );`,
  `CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        tag_name VARCHAR(50) NOT NULL, 
        description VARCHAR(255)
    );`,
  ` CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255) ,
    is_active BOOLEAN,
    created_at DATE,
    interests BIGINT,
    bookmarks BIGINT
);`,
  `CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    news_id BIGINT,
    category_id BIGINT,
    author_id BIGINT,
    status VARCHAR(50),
    published_at DATE,
    source VARCHAR(255),
    lang_id BIGINT
);`,
  `CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255),
    description VARCHAR(255),
    parent_id BIGINT
);`,
  `CREATE TABLE IF NOT EXISTS news_with_langs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    summary_news VARCHAR(255),
    lang_id BIGINT
);`,

`CREATE TABLE IF NOT EXISTS media
(
    id SERIAL PRIMARY KEY,
    news_id BIGINT,
    media_type  VARCHAR(50),
    media_url  VARCHAR(50),
    uploaded_at date,
)`,

`CREATE TABLE IF NOT EXISTS comments
(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    news_id BIGINT,
    content  VARCHAR(100),
    created_at date,
    reply_comment_id BIGINT,
    is_approved BOOLEAN,
    is_deleted BOOLEAN,
    views BIGINT,
    likes BIGINT,
)`,
`CREATE TABLE IF NOT EXISTS reports
(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    news_id BIGINT,
    reason  VARCHAR(100),
    status  VARCHAR(50),
    created_at date,
)`,

`CREATE TABLE IF NOT EXISTS likes
(
    id SERIAL PRIMARY KEY,
    news_id BIGINT,
    user_id BIGINT,
    liked_at TIMESTAMP,
)`,

`CREATE TABLE IF NOT EXISTS views
(
    id SERIAL PRIMARY KEY,
    news_id BIGINT,
    user_id BIGINT,
    viewed_at TIMESTAMP,
)`,

];

module.exports = async () => {
  tables.forEach(async (item) => {
    await pool.query(item);
  });
};
