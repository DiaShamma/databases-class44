const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'papers'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Create research_Papers table
  db.query(`
    CREATE TABLE IF NOT EXISTS research_Papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE
    )`, (err) => {
    if (err) console.error('Error creating research_Papers table:', err);
    else console.log('research_Papers table created');
  });

  // Create author_paper linking table
  db.query(`
    CREATE TABLE IF NOT EXISTS author_paper (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    )`, (err) => {
    if (err) console.error('Error creating author_paper table:', err);
    else console.log('author_paper table created');
  });

  // Insert data into authors table
  db.query(`
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES
  ('Author Name1', 'University1', '1960-01-01', 10, 'Male'),
  ('Author Name2', 'University2', '1970-02-02', 15, 'Female'),
  ('Author Name3', 'University3', '1980-03-03', 12, 'Male'),
  ('Author Name4', 'University4', '1990-04-04', 18, 'Female'),
  ('Author Name5', 'University5', '2000-05-05', 8, 'Male'),
  ('Author Name6', 'University6', '2010-06-06', 20, 'Female'),
  ('Author Name7', 'University7', '2020-07-07', 14, 'Male'),
  ('Author Name8', 'University8', '2030-08-08', 17, 'Female'),
  ('Author Name9', 'University9', '2040-09-09', 16, 'Male'),
  ('Author Name10', 'University10', '2050-10-10', 22, 'Female'),
  ('Author Name11', 'University11', '2060-11-11', 19, 'Male'),
  ('Author Name12', 'University12', '2070-12-12', 25, 'Female'),
  ('Author Name13', 'University13', '2080-01-13', 21, 'Male'),
  ('Author Name14', 'University14', '2090-02-14', 30, 'Female'),
  ('Author Name15', 'University15', '2100-03-15', 28, 'Male')
`, (err) => {
    if (err) console.error('Error inserting data into authors table:', err);
    else console.log('Data inserted into authors table');
  });

  // Inserting  data into research_Papers table

  db.query(`
  INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES
  ('Paper Title1', 'Conference1', '2020-01-01'),
  ('Paper Title2', 'Conference2', '2020-02-02'),
  ('Paper Title3', 'Conference3', '2020-03-03'),
  ('Paper Title4', 'Conference4', '2020-04-04'),
  ('Paper Title5', 'Conference5', '2020-05-05'),
  ('Paper Title6', 'Conference6', '2020-06-06'),
  ('Paper Title7', 'Conference7', '2020-07-07'),
  ('Paper Title8', 'Conference8', '2020-08-08'),
  ('Paper Title9', 'Conference9', '2020-09-09'),
  ('Paper Title10', 'Conference10', '2020-10-10'),
  ('Paper Title11', 'Conference11', '2020-11-11'),
  ('Paper Title12', 'Conference12', '2020-12-12'),
  ('Paper Title13', 'Conference13', '2021-01-13'),
  ('Paper Title14', 'Conference14', '2021-02-14'),
  ('Paper Title15', 'Conference15', '2021-03-15'),
  ('Paper Title16', 'Conference16', '2021-04-16'),
  ('Paper Title17', 'Conference17', '2021-05-17'),
  ('Paper Title18', 'Conference18', '2021-06-18'),
  ('Paper Title19', 'Conference19', '2021-07-19'),
  ('Paper Title20', 'Conference20', '2021-08-20'),
  ('Paper Title21', 'Conference21', '2021-09-21'),
  ('Paper Title22', 'Conference22', '2021-10-22'),
  ('Paper Title23', 'Conference23', '2021-11-23'),
  ('Paper Title24', 'Conference24', '2021-12-24'),
  ('Paper Title25', 'Conference25', '2022-01-25'),
  ('Paper Title26', 'Conference26', '2022-02-26'),
  ('Paper Title27', 'Conference27', '2022-03-27'),
  ('Paper Title28', 'Conference28', '2022-04-28'),
  ('Paper Title29', 'Conference29', '2022-05-29'),
  ('Paper Title30', 'Conference30', '2022-06-30')
`, (err) => {
    if (err) console.error('Error inserting data into research_Papers table:', err);
    else console.log('Data inserted into research_Papers table');
  });


  // Link authors to research papers in author_paper table
  db.query(`
INSERT INTO author_paper (author_id, paper_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(3, 4),
(4, 3),
(4, 5),
(5, 4),
(5, 6),
(6, 5),
(6, 7),
(7, 6),
(7, 8),
(8, 7),
(8, 9),
(9, 8),
(9, 10),
(10, 9),
(10, 11),
(11, 10),
(11, 12),
(12, 11),
(12, 13),
(13, 12),
(13, 14),
(14, 13),
(14, 15),
(15, 14),
(15, 1)
`, (err) => {
    if (err) console.error('Error linking authors to papers:', err);
    else console.log('Authors linked to papers');
  });


  // Closeing  database connection
  db.end(() => {
    console.log('Database connection closed');
  });
});
