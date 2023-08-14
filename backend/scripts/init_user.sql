DROP USER IF EXISTS 'develop'@'%';

CREATE USER 'develop'@'%' IDENTIFIED BY 'pwd';

GRANT ALL PRIVILEGES ON weshare.* TO 'develop'@'%';
