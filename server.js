
/* set up an Express application by requiring the express module and initializing it with express(). 
 configured the application to use the EJS view engine and to serve static files from the "public" directory using express.static().*/

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 9000;
app.set('view engine', 'ejs');
app.use(express.static('public'));


// MySQL database connection  connection to a MySQL database using the mysql module. 
//The connection details such as host, user, password, and database name are specified in the createConnection() method.
const connection = mysql.createConnection({
    host: '10000',
    port: 3306,
    user: 'root',
    password: '',
    database: 'dt207g'
});
// Function to handle database connection errors and attempt reconnection, implemented a function handleDatabaseError() to handle database connection errors. 
//If a connection error with the code 'PROTOCOL_CONNECTION_LOST' occurs, indicating a lost connection, this function attempts to reconnect to the database.
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

// Middleware ,set up body-parser middleware to parse incoming request bodies. This middleware is used to handle form submissions in routes
app.use(bodyParser.urlencoded({ extended: false}));

// Routes , defined several routes to handle different HTTP requests
// GET route for '/' renders the "courses" view, querying all courses from the database and passing them to the view for rendering.
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
// POST route for '/' handles form submissions to add a new course to the database.
app.post('/', (req, res) => {
    const { CourseCode, CourseName, Syllabus, Progression } = req.body;
    connection.query('INSERT INTO courses ( CourseCode, CourseName, Syllabus, Progression) VALUES (?, ?, ?, ?)',
        [ CourseCode, CourseName, Syllabus, Progression],
        (err) => {
            if (err) {
                handleDatabaseError(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
});
// Route to handle course deletion
app.get('/delete/:CourseId', (req, res) => {
    const courseId = req.params.CourseId;
    connection.query('DELETE FROM courses WHERE CourseId = ?', [courseId], (err) => {
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
    const { CourseCode, CourseName, Syllabus, Progression } = req.body;
    connection.query('INSERT INTO courses (CourseCode, CourseName, Syllabus, Progression) VALUES (?, ?, ?, ?)',
        [ CourseCode, CourseName, Syllabus, Progression],
        (err) => {
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
