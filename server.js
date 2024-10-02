// import package
require('dotenv').config();
const mysql = require('mysql2');
const express = require('express')
// const db = require('hospital_db.sql')
const app = express()



// create the connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//conect to the db
// Connect to the database
connection.connect((err) => {
if (err) {
  console.error('Error connecting to the database:', err.stack);
  return;
}
console.log('Connected to the database as id ' + connection.threadId);
});


// Question 1 goes here
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving patients:', error.stack);
      res.status(500).send('Error retrieving patients');
      return;
    }
    res.json(results);
  });
});

// Question 2 goes here
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving providers:', error.stack);
      res.status(500).send('Error retrieving providers');
      return;
    }
    res.json(results);
  });
});

// Question 3 goes here
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

  connection.query(query, [firstName], (error, results) => {
    if (error) {
      console.error('Error retrieving patients:', error.stack);
      res.status(500).send('Error retrieving patients');
      return;
    }
    res.json(results);
  });
});

// Question 4 goes here
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

  connection.query(query, [specialty], (error, results) => {
    if (error) {
      console.error('Error retrieving providers:', error.stack);
      res.status(500).send('Error retrieving providers');
      return;
    }
    res.json(results);
  });
});


// listen to the server
const PORT = 3000

app.get('/', (req, res) => {
    res.status(200).send('Hello, week 5 assignment done.')
})
// Middleware to parse JSON
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})