const setupDatabase = require('./setup');
const transferMoney = require('./transfer');

async function main() {
  // Call the setup function to initialize the database
  await setupDatabase();

  // Call the transfer function to perform transfers
  transferMoney(101, 102, 1000, 'Payment for services');
}

main().catch(console.error);
