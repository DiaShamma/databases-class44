const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});

//..
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");

  // Create authors table ((without the mentor column))
  connection.query(
    `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(255),
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating authors table:", err);
      } else {
        console.log("Authors table created");

        // create  the mentor column in a separate query
        connection.query(
          `
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
      
      `,
          (err) => {
            if (err) {
              console.error("Error adding mentor column:", err);
            } else {
              console.log("Mentor column added");
            }

            // ..
            connection.end();
          }
        );
      }
    }
  );
});
