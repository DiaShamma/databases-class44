
//* =========================================================================================================

//* Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and ( fetch all the records in the database).

//* =========================================================================================================


getPopulation("CountryTable", "' OR '1'='1' --", "' OR '1'='1' --", function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});



//* ========================================================================

//* Rewrite the function so that it is no longer vulnerable to SQL injection

//* ========================================================================


function getPopulation(Country, name, code, cb) {
  // Assuming that connection to the database is established and stored as conn
  const query = 'SELECT Population FROM ?? WHERE Name = ? and code = ?';
  const values = [Country, name, code];

  conn.query(query, values, function (err, result) {
    if (err) cb(err);
    if (result.length === 0) cb(new Error("Not found"));
    cb(null, result[0].name);
  });
}
