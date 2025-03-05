# Student Information System API

This project is a Student Information System API built with Node.js, Express, and PostgreSQL, combined with Sequelize ORM. It provides endpoints to manage students, instructors, courses, sections, rooms, and departments.


## Installation

Clone the repository:

```bash
    git clone https://github.com/alikendir0/student-api.git
```
    
Go to the project directory

```bash
    cd student-api
```

Install dependencies:

```bash
    npm install
```

Update the database configuration located in /config/config.js

Create the database:

```bash
    createdb studentsystem
```

Run migrations:

```bash
    npx sequelize-cli db:migrate
```

Seed the database:

```bash
    npx sequelize-cli db:seed:all
```

# Running the Server
Start the server:

```bash
    npm run dev
```
Note: The server will automatically link itself to the port 3000, if it is occupied change the linked port number.

# API Endpoints
## Students
- GET /students/all - Get all students
- GET /students - Get students with pagination
- GET /students/search - Search students by various criteria
- POST /student - Create a new student
- GET /student/:id - Get a student by ID
- PUT /student/:id - Update a student by ID
- DELETE /student/:id - Delete a student by ID
- GET /student/sections/:id - Get sections for a student
- POST /student/add/section/:id - Assign sections to a student
- DELETE /students/delete/sections - Reset sections for multiple students
- DELETE /student/delete/section/:id/:code - Deassign a section from a student
## Instructors
- GET /instructors - Get all instructors
- POST /instructor - Create a new instructor
- GET /instructor/:id - Get an instructor by ID
- PUT /instructor/:id - Update an instructor by ID
- DELETE /instructor/:id - Delete an instructor by ID
- GET /instructors/faculty/:id - Get instructors by faculty ID
## Courses
- GET /courses - Get all courses
- POST /course - Create a new course
- GET /course/id/:id - Get a course by ID
- GET /course/code/:code - Get a course by code
- PUT /course/:id - Update a course by ID
- DELETE /course/:id - Delete a course by ID
- GET /courses/faculty/:id - Get courses by faculty ID
## Sections
- GET /sections - Get all sections
- POST /section - Create a new section
- GET /section/:id - Get a section by ID
- PUT /section/:id - Update a section by ID
- DELETE /section/:id - Delete a section by ID
- DELETE /section/session/:id - Delete a section session by ID
- GET /sections/student/:id - Get sections for a student
## Rooms
- GET /rooms - Get all rooms
- POST /room - Create a new room
- GET /room/:id - Get a room by ID
- PUT /room/:id - Update a room by ID
- DELETE /room/:id - Delete a room by ID
## Departments
- GET /departments - Get all departments
- POST /department - Create a new department
- GET /department/:id - Get a department by ID
- PUT /department/:id - Update a department by ID
- DELETE /department/:id - Delete a department by ID
- GET /department/cirriculum/:id - Get the curriculum for a department
## Faculties
- GET /faculties - Get all faculties
- POST /faculty - Create a new faculty
- GET /faculty/:id - Get a faculty by ID
- PUT /faculty/:id - Update a faculty by ID
- DELETE /faculty/:id - Delete a faculty by ID
