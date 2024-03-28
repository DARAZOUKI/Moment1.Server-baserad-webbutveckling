const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;

// Sample data
const courses = [
  { coursecode: 'DT207G', coursename: 'Backend-baserad webbutveckling', progression: 'B' },
  { coursecode: 'DT071G', coursename: 'Webbutveckling I', progression: 'A' },
  { coursecode: 'DT093G', coursename: 'Databaser', progression: 'A' }
];

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  // Render the home page with a list of courses
  res.render('index', { courses: courses });
});

app.get('/add', (req, res) => {
  // Render the add course form
  res.render('add');
});

app.post('/add', (req, res) => {
  // Add a new course to the database (not implemented)
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
