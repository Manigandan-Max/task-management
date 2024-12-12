Task Management System

This is a simple Task Management RESTful API built with Node.js and TypeScript using Express and Sequelize ORM. The system allows user registration, login, and task management with full CRUD operations.


Features

•	User Authentication:
    o	Register new users
    o	Login with credentials
•	Task Management (Only accessible to logged-in users):
    o	Create a task
    o	Retrieve all tasks with filters (by status and due date)
    o	Update a task
    o	Delete a task
    o	Retrieve the count of tasks based on their status with date range filters

Technologies Used
    •	Backend:
        o	Node.js
        o	TypeScript
        o	Express.js
    •	Database:
        o	MySQL
        o	Sequelize ORM
    •	Tools:
        o	bcrypt - Password hashing
        o	jsonwebtoken - Authentication using JWT
        o	nodemon - Development server auto-reload
        o	dotenv - Manage environment variables


Prerequisites
Ensure you have the following installed on your machine:
•	Node.js (>= v14.x)
•	MySQL

Installation
    1.Clone the repository:
    git clone <your-repository-url>
    cd task-management

    2.Install dependencies:
    npm install

    3.Set up environment variables:
    Create a .env file in the root directory and add the following:
    
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=task_management
    JWT_SECRET=your_jwt_secret

    4.Set up the database:
    •  Ensure MySQL is running.
    •  Create a new database named task_management.
    •  The Sequelize models will sync with the database automatically.

    5.Run the application:
    For development:  npm run dev
    For production:   npm start


API Endpoints

User Authentication
Method	    Endpoint	    Description
POST	    /register	    Register a new user
POST	    /login	        Login and get a JWT

Task Management
(Requires Authorization: Bearer <token> header)

Method	   Endpoint	                Description
POST	   /createtasks	            Create a task
GET	       /tasks	                Retrieve all tasks (filter optional)
PUT	       /updatetasks/:id	        Update a task
DELETE	   /deletetasks/:id	        Delete a task
GET	       /getCount/:id	        Get count of tasks by status & date


Running the Application

Run the backend server in development mode:
    npm run dev
Use a tool like Postman or cURL to test the endpoints.



Notes
    •	Use a valid JWT token for accessing protected routes.
    •	Tasks can be filtered using query parameters like status and dueDate.
    •	Ensure that dueDate follows the format YYYY-MM-DD.

Troubleshooting
    •	Database Errors: Ensure MySQL is running and credentials in the .env file are correct.
    •	Nodemon Issues: Install it globally using npm install -g nodemon.



