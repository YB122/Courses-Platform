# Courses Platform API

A RESTful API backend for a courses platform, built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: User registration and login with JWT-based authentication
- **User Management**: User profile management with role-based access (students, admins)
- **Course Management**: Create, read, update, and delete courses
- **Session Management**: Manage course sessions/schedules
- **Question Bank**: Create and manage quiz questions for courses
- **Enrollment System**: Enroll students in courses with enrollment tracking
- **File Uploads**: Support for file uploads (course images, documents)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt for password hashing
- **Validation**: Joi schema validation
- **File Uploads**: Multer

## Project Structure

```
src/
├── app.controller.js       # Main app configuration and middleware
├── main.js                 # Application entry point
├── common/                 # Shared utilities and middleware
├── database/               # Database connection and configuration
└── module/                 # Feature modules
    ├── auth/               # Authentication module
    ├── course/             # Course management module
    ├── enrollment/         # Enrollment management module
    ├── question/           # Question/quiz management module
    ├── session/            # Session scheduling module
    └── user/               # User management module
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/auth` | Authentication endpoints (login, register) |
| `/api/users` | User management endpoints |
| `/api/courses` | Course CRUD operations |
| `/api/sessions` | Session management endpoints |
| `/api/question` | Question bank endpoints |
| `/api/enrollments` | Enrollment management endpoints |
| `/uploads` | Static file serving for uploaded files |

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running locally or accessible remotely

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YB122/Courses-Platform.git
cd Courses-Platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create a `.env` file):
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## Scripts

- `npm start` - Start the server with file watching enabled

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `joi` - Data validation
- `multer` - File upload handling

## Excluded from Git

- `node_modules/` - Dependencies folder
- `uploads/` - Uploaded files folder

## License

ISC
