
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

// Define the transfer amount and account numbers
const transferAmount = 1000;
const sourceAccount = 101;
const targetAccount = 102;

// Begin a MySQL transaction
connection.beginTransaction((err) => {
  if (err) throw err;

  // Deduct the amount from the source account
  const deductQuery = `
  UPDATE account
  SET balance = balance - ?
  WHERE account_number = ?`;

  connection.query(deductQuery, [transferAmount, sourceAccount], (err, result) => {
    if (err) {
      connection.rollback(() => {
        throw err;
      });
    }

    // Insert a record into account_changes for the deduction
    const deductionRemark = 'Transfer to account ' + targetAccount;
    const insertDeductionQuery = `
    INSERT INTO account_changes (account_number, amount, remark)
    VALUES (?, ?, ?)`;

    connection.query(insertDeductionQuery, [sourceAccount, -transferAmount, deductionRemark], (err, result) => {
      if (err) {
        connection.rollback(() => {
          throw err;
        });
      }

      // Add the amount to the target account
      const depositQuery = `
      UPDATE account
      SET balance = balance + ?
      WHERE account_number = ?`;

      connection.query(depositQuery, [transferAmount, targetAccount], (err, result) => {
        if (err) {
          connection.rollback(() => {
            throw err;
          });
        }

        // Insert a record into account_changes for the deposit
        const depositRemark = 'Transfer from account ' + sourceAccount;
        const insertDepositQuery = `
        INSERT INTO account_changes (account_number, amount, remark)
        VALUES (?, ?, ?)`;

        connection.query(insertDepositQuery, [targetAccount, transferAmount, depositRemark], (err, result) => {
          if (err) {
            connection.rollback(() => {
              throw err;
            });
          }

          connection.commit((err) => {
            if (err) {
              connection.rollback(() => {
                throw err;
              });
            }
            console.log('Transaction completed successfully.');
            connection.end();
          });
        });
      });
    });
  });
});
