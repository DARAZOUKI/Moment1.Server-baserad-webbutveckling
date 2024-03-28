const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dt207g'
});

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
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('courses', { courses: rows });
        }
    });
});

app.post('/courses', (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;
    connection.query('INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)',
        [coursecode, coursename, syllabus, progression],
        (err) => {
            if (err) {
                console.error(err);
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
