const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'papers',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



// Function to process and display the results of a SQL query
function processQueryResult(err, results, message) {
  if (err) {
    // If there is an error
    console.error('Error executing query:', err);
  } else {
    // If the query is successful
    console.log(message);
    console.log(results);
  }
}



// Query to print names of all authors and their mentors
db.query(
  `
  SELECT 
  a1.author_name AS Author, 
  a2.author_name AS Mentor 
FROM 
  authors a1
LEFT JOIN 
  authors a2 ON a1.mentor = a2.author_id;

`,
  (err, results) => {
    processQueryResult(err, results, '\nAuthors and Their Mentors:');
  }
);

// Query to  all columns of authors and their published paper
db.query(
  `
  SELECT 
    a.author_name, 
    rp.paper_title 
FROM 
    authors a
LEFT JOIN 
    author_paper ap ON a.author_id = ap.author_id
LEFT JOIN 
    research_Papers rp ON ap.paper_id = rp.paper_id;

  `,
  (err, results) => {
    processQueryResult(err, results, '\nAuthors and Their Published Papers:');
  }
);

// Close the connection
db.end();