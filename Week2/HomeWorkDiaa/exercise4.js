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

// Error handling function
function handleQueryError(err) {
  if (err) {
    console.error('Error executing query:', err);
  }
}

// Count of Authors per Research Paper:
db.query(
  `
  SELECT 
  rp.paper_title, 
  COUNT(ap.author_id) AS Author_Count
FROM 
  research_Papers rp
LEFT JOIN 
  author_paper ap ON rp.paper_id = ap.paper_id
GROUP BY 
  rp.paper_id;
  `,
  (err, results) => {
    handleQueryError(err);
    console.log('\nResearch Papers and Number of Authors:');
    results.forEach((row) => {
      console.log(`Paper Title: ${row.paper_title}, Number of Authors: ${row.Author_Count}`);
    });
  }
);

// Sum of Papers by Female Authors:
db.query(
  `
  SELECT 
  COUNT(DISTINCT rp.paper_id) AS Female_Author_Papers
FROM 
  authors a
JOIN 
  author_paper ap ON a.author_id = ap.author_id
JOIN 
  research_Papers rp ON ap.paper_id = rp.paper_id
WHERE 
  a.gender = 'Female';
  `,
  (err, results) => {
    handleQueryError(err);
    console.log('\nSum of Research Papers by Female Authors:');
    console.log(`Total Papers: ${results[0].Female_Author_Papers || 0}`);
  }
);

// Average H-Index per University:
db.query(
  `
  SELECT 
  university, 
  AVG(h_index) AS Avg_H_Index
FROM 
  authors
GROUP BY 
  university;
  `,
  (err, results) => {
    handleQueryError(err);
    console.log('\nAverage H-Index of Authors per University:');
    results.forEach((row) => {
      console.log(`University: ${row.university}, Average H-Index: ${row.Avg_H_Index}`);
    });
  }
);

// Sum of Research Papers per University:
db.query(
  `
  SELECT 
    a.university, 
    COUNT(DISTINCT rp.paper_id) AS Total_Papers
FROM 
    authors a
JOIN 
    author_paper ap ON a.author_id = ap.author_id
JOIN 
    research_Papers rp ON ap.paper_id = rp.paper_id
GROUP BY 
    a.university;
  `,
  (err, results) => {
    handleQueryError(err);
    console.log('\nTotal Research Papers by University:');
    results.forEach((row) => {
      console.log(`University: ${row.university}, Total Papers: ${row.Total_Papers || 0}`);
    });
  }
);

// Min and Max H-Index per University:
db.query(
  `
  SELECT 
  university, 
  MIN(h_index) AS Min_H_Index, 
  MAX(h_index) AS Max_H_Index
FROM 
  authors
GROUP BY 
  university;
  `,
  (err, results) => {
    handleQueryError(err);
    console.log('\nMinimum and Maximum H-Index of Authors per University:');
    results.forEach((row) => {
      console.log(`University: ${row.university}, Min H-Index: ${row.Min_H_Index || 'N/A'}, Max H-Index: ${row.Max_H_Index || 'N/A'}`);
    });
  }
);

// Close the connection
db.end();
