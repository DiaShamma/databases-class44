
const mysql = require('mysql');

// connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

//  account table
const createAccountTableQuery = `
CREATE TABLE IF NOT EXISTS account (
  account_number INT AUTO_INCREMENT PRIMARY KEY,
  balance DECIMAL(10, 2) NOT NULL
)`;

//  account_changes table
const createAccountChangesTableQuery = `
CREATE TABLE IF NOT EXISTS account_changes (
  change_number INT AUTO_INCREMENT PRIMARY KEY,
  account_number INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  remark VARCHAR(255),
  FOREIGN KEY (account_number) REFERENCES account(account_number)
)`;

// Execute the create table queries
connection.query(createAccountTableQuery, (error) => {
  if (error) throw error;
  console.log('Account table created');
});

connection.query(createAccountChangesTableQuery, (error) => {
  if (error) throw error;
  console.log('Account Changes table created');
});

connection.end();
