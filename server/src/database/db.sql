DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (name)
    VALUES ('joe'),
    ('ryan');

select * from users;
