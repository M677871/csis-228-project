# CSIS-228 Project Node.js with Database Project

## 📌 Overview
This project is a **Node.js** application that integrates with a database. It demonstrates key concepts in backend development, including RESTful API design, database management, and authentication.

## 🛠 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [mariaDB](https://www.MariaDB.com/) (v8.0 or later recommended)
- [Postman](https://www.postman.com/) (optional, for API testing)

## 📂 Project Structure
```
/project-root
│── /config          # Configuration files
│── /models          # ORM/ODM models
│── /repositories    # Database access layer
│── /services        # Business logic
│── /controllers     # Request handlers
│── /middlewares     # Custom middlewares (e.g., auth, error handling)
│── /validators      # Request validation logic
│── /routes          # API route definitions
│── /utils           # Helper functions
│── .env             # Environment variables
│── .gitignore       # Git ignored files
│── csis228.sql      # Database schema
│── index.js         # Application entry point
│── package.json     # Node.js dependencies
│── README.md        # Documentation

```

## 🚀 Installation & Setup
1. **Clone the repository**
    ```sh
    git clone https://github.com/M677871/csis-228-project.git
    cd csis-228-project
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Configure environment variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    DB_HOST=your-database-host
    DB_USER=your-database-user
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    ```

4. **Run database migrations (if applicable)**
    ```sh
    npm run migrate
    ```

5. **Start the server**
    ```sh
    npm start
    ```
    For development mode:
    ```sh
    npm run dev
    ```
    The server will run on `http://localhost:3000`.

## 📌 API Endpoints

### User Routes
| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| GET    | /api/users                  | Get all users               |
| GET    | /api/users/:id               | Get user by ID              |
| GET    | /api/users/email             | Get user by email (via POST body) |
| POST   | /api/users                   | Create a new user           |
| POST   | /api/users/login             | User login                  |
| PUT    | /api/users/:id               | Update user                 |
| PUT    | /api/users/changePassword    | Change user password        |
| DELETE | /api/users/:id               | Delete user                 |


### Student Routes
| Method | Endpoint                              | Description                         |
|--------|---------------------------------------|-------------------------------------|
| GET    | /api/students                        | Get all students                   |
| GET    | /api/students/:id                    | Get student by ID                  |
| GET    | /api/students/studentCourses/:id     | Get courses for a specific student |
| POST   | /api/students                        | Create a new student               |
| PUT    | /api/students/:id                    | Update student                     |
| DELETE | /api/students/:id                    | Delete student                     |


### Quiz Routes
| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| GET    | /api/quizzes         | Get all quizzes  |
| GET    | /api/quizzes/:id     | Get quiz by ID   |
| POST   | /api/quizzes         | Create a new quiz |
| PUT    | /api/quizzes/:id     | Update quiz      |
| DELETE | /api/quizzes/:id     | Delete quiz      |

### Quiz Result Routes
| Method | Endpoint                 | Description               |
|--------|--------------------------|---------------------------|
| GET    | /api/quizResults         | Get all quiz results     |
| GET    | /api/quizResults/:id     | Get quiz result by ID    |
| POST   | /api/quizResults         | Create a new quiz result |
| PUT    | /api/quizResults/:id     | Update quiz result       |
| DELETE | /api/quizResults/:id     | Delete quiz result       |

### Quiz Question Routes
| Method | Endpoint                 | Description                |
|--------|--------------------------|----------------------------|
| GET    | /api/quizQuestions       | Get all quiz questions    |
| GET    | /api/quizQuestions/:id   | Get quiz question by ID   |
| POST   | /api/quizQuestions       | Create a new quiz question |
| PUT    | /api/quizQuestions/:id   | Update quiz question      |
| DELETE | /api/quizQuestions/:id   | Delete quiz question      |

### Quiz Answer Routes
| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | /api/quizAnswers     | Get all quiz answers  |
| GET    | /api/quizAnswers/:id | Get quiz answer by ID |
| POST   | /api/quizAnswers     | Create a new quiz answer |
| PUT    | /api/quizAnswers/:id | Update quiz answer    |
| DELETE | /api/quizAnswers/:id | Delete quiz answer    |

### Instructor Routes
| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | /api/instructors                 | Get all instructors               |
| GET    | /api/instructors/:id             | Get instructor by ID              |
| GET    | /api/instructors/courses/:id     | Get courses for a specific instructor |
| POST   | /api/instructors                 | Create a new instructor           |
| PUT    | /api/instructors/:id             | Update instructor                 |
| DELETE | /api/instructors/:id             | Delete instructor                 |


### Enrollment Routes
| Method | Endpoint                 | Description             |
|--------|--------------------------|-------------------------|
| GET    | /api/enrollments         | Get all enrollments    |
| GET    | /api/enrollments/:id     | Get enrollment by ID   |
| POST   | /api/enrollments         | Create a new enrollment |
| PUT    | /api/enrollments/:id     | Update enrollment      |
| DELETE | /api/enrollments/:id     | Delete enrollment      |

### Course Routes
| Method | Endpoint                                 | Description                          |
|--------|-----------------------------------------|--------------------------------------|
| GET    | /api/courses                           | Get all courses                     |
| GET    | /api/courses/:id                       | Get course by ID                    |
| GET    | /api/courses/instructorByCourseId/:id  | Get instructor details by course ID |
| POST   | /api/courses                           | Create a new course                 |
| PUT    | /api/courses/:id                       | Update course                       |
| DELETE | /api/courses/:id                       | Delete course                       |


### Course Material Routes
| Method | Endpoint                     | Description                 |
|--------|------------------------------|-----------------------------|
| GET    | /api/courseMaterials         | Get all course materials   |
| GET    | /api/courseMaterials/:id     | Get course material by ID  |
| POST   | /api/courseMaterials         | Create a new course material |
| PUT    | /api/courseMaterials/:id     | Update course material     |
| DELETE | /api/courseMaterials/:id     | Delete course material     |

### Category Routes
| Method | Endpoint                          | Description                     |
|--------|-----------------------------------|---------------------------------|
| GET    | /api/categories                   | Get all categories             |
| GET    | /api/categories/:id               | Get category by ID             |
| GET    | /api/categories/courses/:id       | Get courses by category ID     |
| GET    | /api/categories/instructor/:id    | Get instructors by category ID |
| POST   | /api/categories                   | Create a new category          |
| PUT    | /api/categories/:id               | Update category                |
| DELETE | /api/categories/:id               | Delete category                |




## 🛠 Technologies Used
- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MariaDB** - Relational database
- **dotenv** - Environment variable management
- **express-validator** – Request validation
- **bcrypt** – Password hashing
- **jsonwebtoken** – JWT authentication
- **moment** - Library for handling dates and times.
- **sequelize** - ORM for handling database models and queries.


## 🔍 Best Practices Followed
✔️ Follows MVC architecture  
✔️ Uses environment variables for security  
✔️ Implements error handling and validation  
✔️ Uses async/await for better promise handling  

## 📝 License
This project is licensed under the [MIT License](LICENSE).

---
Feel free to contribute by opening issues or submitting pull requests! 🚀
