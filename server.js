const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.static('public'));

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dt207g'
});
// Function to handle database connection errors and attempt reconnection
function handleDatabaseError(err) {
    console.error('Error connecting to MySQL database:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Reconnect to the database
        console.log('Attempting to reconnect to MySQL database...');
        connection.connect((err) => {
            if (err) {
                console.error('Error reconnecting to MySQL database:', err);
                return;
            }
            console.log('Reconnected to MySQL database');
        });
    }
}
// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM courses', (err, rows) => {
        if (err) {
            handleDatabaseError(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('courses', { courses: rows });
        }
    });
});

app.post('/', (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;
    connection.query('INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)',
        [coursecode, coursename, syllabus, progression],
        (err) => {
            if (err) {
                handleDatabaseError(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
});
// Route to render the add course form
app.get('/add', (req, res) => {
    res.render('add');
});

// Route to handle form submission and add a new course to the database
app.post('/add', (req, res) => {
    const { coursecode, coursename, progression } = req.body;
    connection.query('INSERT INTO courses (coursecode, coursename, progression) VALUES (?, ?, ?)',
        [coursecode, coursename, progression],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
});
// Route to handle course deletion
app.get('/#/:id', (req, res) => {
    const courseId = req.params.id;
    connection.query('DELETE FROM courses WHERE id = ?', [courseId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/');
        }
    });
});
// Route to render the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
