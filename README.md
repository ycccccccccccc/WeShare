# WeShare - let's share 🍻
💡 According to statistical data from the Ministry of the Interior, Executive Yuan, it is currently observed that **over 50% of households in Taiwan consist of two individuals or fewer**. 

#### In summer 2023, my team and I have completed a group-buying platform where anyone can become the initiator of a group purchase and, of course, also participate as a buyer. We have integrated Google Maps to enhance the search user experience. Here are some key features:

* We set up the environment using **Docker**, ensuring it's not bound by specific computer operating systems.
* We used **Redis' Rate Limiter** to implemented IP traffic control.
* Through **GitHub Actions**, I practiced **CI/CD**, accelerating the software development lifecycle while ensuring code quality.

## 🚀 How to reproduce the project?
**Recommended to run on AWS (EC2)**
1. Download WeShare from https://github.com/ycccccccccccc/WeShare
2. Navigate to the backend directory using the command cd backend
3. Configure the `.env` parameters: `DB_password` for MySQL password.
4. Create a folder named `private`, then add SSL key files named `certificate.crt` and `private.key`.
5. Run `docker-compose up --build`.
6. Congratulations! You can test it using Postman at `https://<ssl-url>/<API>`. For example, `https://13.238.130.147/users/signup`. This is the URL format.

## 🚀 In this project, I learned and utilized the following skills:
### Programming Language
1. JavaScript

### Backend Environment and Framework
1. Linux
2. Node.js
3. Express.js

### SQL Database
1. CRUD Operations: MySQL
2. Indexing, Primary Key, Foreign Key and Joins
3. Transaction and ACID
4. Data Model: One-to-One, One-to-Many, Many-to-Many
5. Database Normalization
6. Security and SQL Injection. 

### Cloud Service
1. AWS EC2 and RDS

### Parallel Computing
1. Multi-Threaded Programming
2. Race Condition and Deadlock

### Networking
1. TCP/IP Protocol
2. HTTPS
3. Domain Name System (DNS)
4. Public-Key Cryptography
5. Cache Mechanism

### Key Concepts
1. Version Control: Git, Github
2. Asynchronous: callback, Promise and async/await 
3. Javascript Event Loop
4. RESTful APIs
5. Unit Test
6. CI/CD: Github actions
7. OOP and Functional Programming
8. Availability and Scalability
9. Coding styles and Code Readability
