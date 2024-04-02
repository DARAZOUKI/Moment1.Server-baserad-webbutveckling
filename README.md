# CV Database Web Application

This repository contains a web application for managing and displaying courses using a MySQL database. The application is built using Node.js and Express.

## Overview

The main objective of this project is to create a web application where users can store and showcase the courses they have completed. The application utilizes Node.js and Express for server-side operations and connects to a MySQL database to store course information.

## Project Structure

The project consists of the following files:

- **server.js**: This file contains the implementation of the server and routing logic. It establishes connections to the MySQL database, defines middleware, and sets up routes for handling HTTP requests.
- **views/**: This directory contains the EJS templates used for rendering HTML pages.
- **public/**: This directory contains static assets such as CSS files, images, and client-side JavaScript files.

## Features

The web application includes the following features:

- **Course Display Page**: Users can view all courses stored in the database. Each course is displayed with its course code, course name, syllabus, and progression. Users can also delete courses from this page.
- **Add Course Page**: Users can add new courses using a form. The form includes fields for entering the course code, course name, and progression. Upon submission, the new course is added to the database.
- **About Page**: This page provides information about the web application and its purpose.

## Database Schema

The MySQL database contains a single table named `courses` with the following columns:

- `id`: Primary key, auto-incremented unique identifier for each course.
- `coursecode`: Course code, e.g., "DT207G".
- `coursename`: Name of the course, e.g., "Backend-based Web Development".
- `syllabus`: Link to the course syllabus.
- `progression`: Progression level of the course.

## Conclusion

In conclusion, this project demonstrates the development of a web application for managing courses using Node.js, Express, and MySQL. By implementing features such as course display, addition, and deletion, users can efficiently organize and showcase their completed courses.
