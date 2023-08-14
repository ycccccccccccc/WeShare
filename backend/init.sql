-- 創建資料庫（如果不存在）
SELECT 'CREATE DATABASE weshare' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'weshare');
SELECT 'CREATE DATABASE weshare_test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'weshare_test');

-- 設定時間
SET GLOBAL time_zone = '+8:00';
SET time_zone = '+8:00';

-- 創建 user 表格（如果不存在）
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user') THEN
        CREATE TABLE user (
            id SERIAL PRIMARY KEY,
            provider VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            picture VARCHAR(255),
            password VARCHAR(255) NOT NULL,
            introduction VARCHAR(255),
            tags VARCHAR(255)
        );
    END IF;
END $$;

-- 創建 item_tag 列舉型別（如果不存在）
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'item_tag') THEN
        CREATE TYPE item_tag AS ENUM ('食品', '日用品', '衣物', '美妝', '家具', '優惠卷', '其他');
    END IF;
END $$;

-- 創建 item 表格（如果不存在）
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'item') THEN
        CREATE TABLE item (
            id SERIAL PRIMARY KEY,
            seller_id INT NOT NULL,
            buyer_id INT,
            title VARCHAR(255) NOT NULL, 
            image VARCHAR(255) NOT NULL, 
            introduction VARCHAR(255) NOT NULL, 
            cost INT NOT NULL, 
            tag item_tag, 
            location VARCHAR(255) NOT NULL,
            CONSTRAINT item_seller_id_key FOREIGN KEY (seller_id) REFERENCES "user"(id) ON DELETE CASCADE,
            CONSTRAINT item_buyer_id_key FOREIGN KEY (buyer_id) REFERENCES "user"(id) ON DELETE CASCADE
        );
    END IF;
END $$;

