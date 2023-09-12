const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://dshamma89:<password>@cluster0.iy4atgb.mongodb.net/';
const dbName = 'dBank';

async function transferMoney(fromAccountNumber, toAccountNumber, amount, remark) {
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const accounts = db.collection('accounts');

    // Retrieve the accounts involved in the transfer
    const fromAccount = await accounts.findOne({ account_number: fromAccountNumber });
    const toAccount = await accounts.findOne({ account_number: toAccountNumber });

    if (!fromAccount || !toAccount) {
      console.log('One or both of the accounts do not exist.');
      return;
    }

    if (fromAccount.balance < amount) {
      console.log('Insufficient balance in the source account.');
      return;
    }

    // Calculate new balances and change numbers
    const newFromBalance = fromAccount.balance - amount;
    const newToBalance = toAccount.balance + amount;
    const newChangeNumber = Math.max(fromAccount.account_changes.length, toAccount.account_changes.length) + 1;

    // Update account balances
    await accounts.updateOne({ account_number: fromAccountNumber }, {
      $set: {
        balance: newFromBalance,
      },
      $push: {
        account_changes: {
          change_number: newChangeNumber,
          amount: -amount,
          changed_date: new Date(),
          remark,
        },
      },
    });

    await accounts.updateOne({ account_number: toAccountNumber }, {
      $set: {
        balance: newToBalance,
      },
      $push: {
        account_changes: {
          change_number: newChangeNumber,
          amount,
          changed_date: new Date(),
          remark,
        },
      },
    });

    console.log('Transfer successful.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

// Example usage:
transferMoney(101, 102, 1000, 'Payment for services');


module.exports = transferMoney;
