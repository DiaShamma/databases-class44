const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

// Insert sample data into the account table
const insertAccountDataQuery = `
INSERT INTO account (account_number, balance)
VALUES
  (101, 10000.00),
  (102, 5000.00)`;

// Execute the insert data query for the account table
connection.query(insertAccountDataQuery, (error) => {
  if (error) throw error;
  console.log('Sample data inserted into the account table');
});

// Close the MySQL connection
connection.end();
