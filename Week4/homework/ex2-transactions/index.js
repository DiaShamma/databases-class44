const setupDatabase = require('./setup');
const transferMoney = require('./transfer');

// Call the setup function to initialize the database
setupDatabase();

// Call the transfer function to perform transfers
transferMoney(101, 102, 1000, 'Payment for services');
