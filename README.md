# Library Management System Backend

## Description
This project provides a backend system for managing library operations. It focuses on user management, CRUD (Create, Read, Update, Delete) operations for books, and book borrowing/return processes. The system is built with Node.js, Express.js, and MongoDB, ensuring scalability, ease of maintenance, and a structured API design.

## Approach
- The backend is designed with **Express.js** to handle API requests.
- **MongoDB** is used as the database to store users and books.
- **CRUD operations** for users and books.
- **User roles**: Readers and Authors.
- **JWT Authentication** for user login and session management.
  
1) ## Technology Stack:

- Backend Framework: Built using Node.js with Express.js for routing and handling API requests.
- Database: MongoDB is used as a NoSQL database to store information about users, books, and transactions.
- Authentication: Utilizes JWT (JSON Web Tokens) for secure user login and session management.
 
2) ## Core Features:
- **CRUD Operations:**
Add, edit, delete, and fetch details for books and users.
- **User Roles:**
  - **Readers**: Can borrow books and view book details.
  - **Authors**: Can add books and manage their details.
- **Book Borrowing and Return**:
  - Tracks book availability and borrowing/return processes.
- **Security:**
  - Enforces secure API access through authentication and role-based access control.

3) ## Modular Design:
 - Follows a modular architecture separating routes, controllers, and database models for maintainability and scalability.
 - Ensures clean code practices and proper error handling.

## Setup and Run Instructions

 **Prerequisites**
Ensure the following are installed on your system:

- Node.js (v14 or later)
- MongoDB (Ensure a MongoDB server is running locally or use a cloud instance like MongoDB Atlas)
- Git (for cloning the repository)

## Steps to Set Up

 1) **Clone the Repository:**
 - cmd: git clone https://github.com/Devashrii/Library-Management-System
cd Library-Management-System

 2) **Install Dependencies**: Install the required Node.js packages using npm:
 - code: npm install

 3) **Configure Environment Variables**: Create a .env file in the project root directory with the following variables:
 - code:
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/libraryDB
  JWT_SECRET=your_secret_key
  Replace MONGO_URI with your MongoDB connection string and JWT_SECRET with a secure key for JWT authentication.

  4) **Set Up the Database:**
  - Start the MongoDB server locally or connect to MongoDB Atlas.
  - The system will automatically create necessary collections (users, books, etc.) upon first run.

  5) **Run the Application:** Start the server with:
  - cmd: npm start
  - By default, the server will run on http://localhost:3000.



