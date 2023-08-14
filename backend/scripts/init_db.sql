-- Create the 'weshare' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS weshare;
CREATE DATABASE IF NOT EXISTS weshare_test;

use weshare;

-- Set the timezone
SET time_zone = '+8:00';

-- Create the 'user' table if it doesn't exist
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rating FLOAT,
    photo VARCHAR(255),
    phone INT
);

-- Create the 'item_tag' ENUM type if it doesn't exist
CREATE TABLE IF NOT EXISTS item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT NOT NULL,
    buyer_id INT,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    introduction VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    tag ENUM('食品', '日用品', '衣物', '美妝', '家具', '優惠卷', '其他') NOT NULL,
    location VARCHAR(255) NOT NULL,
    CONSTRAINT item_seller_id_key FOREIGN KEY (seller_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT item_buyer_id_key FOREIGN KEY (buyer_id) REFERENCES user(id) ON DELETE CASCADE
);
