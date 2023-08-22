const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world'
});

//*
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the "world" database');

  //*
  connection.query(
    'SELECT name FROM country WHERE population > 8000000',
    (error, results) => {
      if (error) throw error;
      console.log('Countries with population greater than 8 million:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM country WHERE name LIKE "%land%"',
    (error, results) => {
      if (error) throw error;
      console.log('Countries with "land" in their names:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000',
    (error, results) => {
      if (error) throw error;
      console.log('Cities with population between 500,000 and 1 million:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM country WHERE continent = "Europe"',
    (error, results) => {
      if (error) throw error;
      console.log('Countries in the continent "Europe":');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM country ORDER BY surfacearea DESC',
    (error, results) => {
      if (error) throw error;
      console.log('Countries in descending order of surface area:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM city WHERE countrycode = "NLD"',
    (error, results) => {
      if (error) throw error;
      console.log('Cities in the Netherlands:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT population FROM city WHERE name = "Rotterdam"',
    (error, results) => {
      if (error) throw error;
      console.log('Population of Rotterdam:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10',
    (error, results) => {
      if (error) throw error;
      console.log('Top 10 countries by surface area:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT name FROM city ORDER BY population DESC LIMIT 10',
    (error, results) => {
      if (error) throw error;
      console.log('Top 10 most populated cities:');
      console.log(results);
    }
  );

  //*
  connection.query(
    'SELECT SUM(population) AS world_population FROM country',
    (error, results) => {
      if (error) throw error;
      console.log('Population number of the world:');
      console.log(results);
    }
  );


  //*
  connection.end((error) => {
    if (error) throw error;
    console.log('Connection closed');
  });
});
