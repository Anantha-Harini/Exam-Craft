# Exam Craft - Automated Question Paper Generator

A full-stack platform designed to help educational institutions and departments automatically generate structured, balanced exam question papers from a centralized question bank. It streamlines curriculum management and question authoring with separate portals for administrators and teachers.

Built with Node.js, Express, MongoDB, Angular (Admin), and React (Teacher).

## Features

### Teacher Portal 
- **Manage Question Bank:** Add new questions specifying subject, unit, difficulty, and marks.
- **Review Questions:** View, edit, and delete existing questions from the centralized question bank.
- **Secure Access:** Protected routes and secure login exclusively for authorized teaching staff.

### Admin Dashboard
- **Manage Curriculum:** Add, view, and delete subjects and their corresponding units.
- **Generate Question Papers:** Automatically create customized exam papers (Assessment or Semester) by selecting the subject, specific units, and difficulty level.
- **View & Download Papers:** Access previously generated question papers and download them as text files.
- **Administrative Control:** Secure login and comprehensive management capabilities for administrators.

### Security
- **Role-Based Access Control (RBAC):** Distinct roles and permissions for Admins and Teachers.
- **Authentication:** Protected API endpoints and frontend routes.
- **Secure Configuration:** Use of environment variables for sensitive database credentials.

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Backend    | Node.js, Express, Jest (for testing)          |
| Frontend   | Angular (Admin Dashboard), React (Teacher Portal) |
| Database   | MongoDB                                       |
| Testing    | Jest                                          |

## Project Structure

```text
Automated-Question-Paper-Generation-System/
├── Backend/
│   ├── generator.js         # Core logic for paper generation
│   ├── generator.test.js    # Unit tests for generator logic
│   ├── server.js            # Express server and API endpoints
│   └── .env                 # Environment variables (Mongo URI, Port)
├── admin-angular/           # Admin portal (Angular)
│   └── src/app/
│       ├── dashboard/       # Admin landing page
│       ├── generatepaper/   # Interface to select criteria and build papers
│       ├── login/           # Admin authentication
│       ├── subjects/        # CRUD operations for subjects
│       ├── units/           # Manage units within subjects
│       └── viewpapers/      # Download generated papers
└── teacher-react/           # Teacher portal (React)
    └── src/components/
        ├── AddQuestion.jsx  # Form to add questions to the bank
        ├── Dashboard.jsx    # Teacher landing page
        ├── Login.jsx        # Teacher authentication
        └── ViewQuestions.jsx# List and manage questions
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB installed locally or a MongoDB Atlas URI
- Angular CLI (`npm install -g @angular/cli`)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Automated-Question-Paper-Generation-System
```

### 2. Set Up the Database
Ensure your MongoDB server is running. (e.g., standard `mongodb://localhost:27017` or Atlas).

### 3. Configure Environment
Create a `.env` file in the `Backend` directory:
```env
MONGO_URI=mongodb://localhost:27017/Question_Paper_Generation_System
PORT=5000
```

### 4. Run the Application
Open three separate terminal windows and run the following commands to start the backend and both frontends:

**Terminal 1: Backend**
```bash
cd Backend
npm install
npm start
```
The backend API starts at `http://localhost:5000`

**Terminal 2: Admin App (Angular)**
```bash
cd admin-angular
npm install
ng serve
```
The Admin portal starts at `http://localhost:4200`

**Terminal 3: Teacher App (React)**
```bash
cd teacher-react
npm install
npm start
```
The Teacher portal starts at `http://localhost:3000`


## Running Tests

This project includes automated unit tests for the core logic, such as the paper generation algorithm.

### Backend Tests
The backend uses [Jest](https://jestjs.io/) for unit testing. To run the backend tests:
```bash
cd Backend
npm test
```
This will run the test suites and output the results in the terminal.

## Test Coverage

| Test Suite          | Tests | Description                                                                 |
| ------------------- | ----- | --------------------------------------------------------------------------- |
| `generator.test.js` | 3     | Assessment generation logic, capacity validation, invalid exam type handling |

## License
This project is open source and available under the MIT License.
