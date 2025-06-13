DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    note TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);


