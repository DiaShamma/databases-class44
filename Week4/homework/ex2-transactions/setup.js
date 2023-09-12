const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://dshamma89:<password>@cluster0.iy4atgb.mongodb.net/';
const dbName = 'dBank';

async function setupDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const accounts = db.collection('accounts');

    // Clean up the accounts collection (remove existing data)
    await accounts.deleteMany({});

    // Sample data for accounts
    const sampleData = [
      {
        account_number: 101,
        balance: 1000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 2000,
        account_changes: [],
      },
    ];

    // Insert sample data into the accounts collection
    await accounts.insertMany(sampleData);

    console.log('Sample data inserted into the accounts collection.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

setupDatabase();

module.exports = setupDatabase;
