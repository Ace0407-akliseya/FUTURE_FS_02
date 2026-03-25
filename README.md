# 🚀 FutureTech CRM - Full Stack Lead Management System

FutureTech CRM is a bespoke, high-performance Customer Relationship Management system designed to streamline client lead tracking. Built with a modern MERN stack (MySQL, Express, React, Node.js), it combines robust backend logic with a premium, glassmorphism-inspired user interface.

## ✨ Key Features

### Premium "Dark Glass" UI
A modern interface crafted with Tailwind CSS, featuring sophisticated glassmorphism, blur effects, and a professional Slate & Indigo color palette.

### Full-Stack Engine
Responsive frontend built with React (Vite) and a scalable REST API powered by Node.js and Express.

### Relational Data Management
Leveraging MySQL with Sequelize ORM for structured, reliable data handling.

### Secure Admin Access
Industry-standard JWT (JSON Web Tokens) and BCrypt password hashing to protect sensitive lead information.

### Lead Capture API
A dedicated public endpoint allows you to feed leads directly into the CRM from external portfolio sites or contact forms.

### Dynamic Dashboard
Real-time stats for "New," "Contacted," and "Converted" leads with global search functionality.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL, Sequelize ORM |
| **Security** | JWT, BCrypt, DOTENV |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- MySQL Server
- A code editor (like VS Code)

### 1. Database Configuration
Create a new schema in your MySQL instance:

```sql
CREATE DATABASE minicrm;
1. Backend Setup
Navigate to the server directory and install dependencies:

cd server
npm install
Configure your .env file in server/ with your database credentials:

DB_NAME=minicrm
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_secret_key
PORT=5000
Start the backend server:

npm run dev
Server runs on http://localhost:5000

2. Frontend Setup
Navigate to the client directory and install dependencies:

cd client
npm install
Start the frontend application:

npm run dev
Client runs on http://localhost:5173

📖 Usage Guide
Register/Login: Access /login to create an admin account or log in.
Dashboard: View the summary of your leads (New, Contacted, Converted).
Manage Leads:
Add: Use the "New Lead" button.
Update: Change status directly from the dropdown.
Details: Click the eye icon to view details, add notes, and set follow-ups.
Delete: Remove leads from the system.
🤝 Contributing
## 🤝 Contributing
Feel free to fork this project and submit a pull request!
📄 License
This project is open source and available under the MIT License."# FUTURE_FS_02" 
"# FUTURE_FS_02" 
