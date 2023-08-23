const mysql = require('mysql');

//*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

//*
connection.query('CREATE DATABASE IF NOT EXISTS meetup', (error) => {
  if (error) throw error;
  console.log('Database created or already exists');
});

//*
connection.changeUser({ database: 'meetup' }, (error) => {
  if (error) throw error;
  console.log('Connected to meetup database');
});

//*
const createInviteeTable = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT PRIMARY KEY,
    invitee_name VARCHAR(255),
    invited_by INT
  )
`;

connection.query(createInviteeTable, (error) => {
  if (error) throw error;
  console.log('Invitee table created or already exists');
});

//*
const createRoomTable = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  )
`;

connection.query(createRoomTable, (error) => {
  if (error) throw error;
  console.log('Room table created or already exists');
});

//*
const createMeetingTable = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT
  )
`;

connection.query(createMeetingTable, (error) => {
  if (error) throw error;
  console.log('Meeting table created or already exists');
});


//*
const insertData = () => {
  // Insert data into Invitee table
  const inviteeData = [
    [1, 'John Doe', null],
    [2, 'Jane Smith', 1],
    // ... (insert more rows)
  ];
  const inviteeQuery = 'INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES ?';
  connection.query(inviteeQuery, [inviteeData], (error) => {
    if (error) throw error;
    console.log('Data inserted into Invitee table');
  });

  //*
  const roomData = [
    [101, 'Conference Room A', 1],
    [102, 'Meeting Room B', 1],

  ];
  const roomQuery = 'INSERT INTO Room (room_no, room_name, floor_number) VALUES ?';
  connection.query(roomQuery, [roomData], (error) => {
    if (error) throw error;
    console.log('Data inserted into Room table');
  });

  //*
  const meetingData = [
    [1, 'Project Kickoff', '2023-08-22 09:00:00', '2023-08-22 11:00:00', 101],
    [2, 'Team Standup', '2023-08-23 10:00:00', '2023-08-23 10:30:00', 102],

  ];

  //*
  const meetingQuery = 'INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ?';
  connection.query(meetingQuery, [meetingData], (error) => {
    if (error) throw error;
    console.log('Data inserted into Meeting table');
  });
};


//*
insertData();
connection.end((error) => {
  if (error) throw error;
  console.log('Connection closed');
});
