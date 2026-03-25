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

### 2. Backend Setup
bash
cd server
npm install
### Create a .env file in the server/ directory:

env
DB_NAME=minicrm
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_key
PORT=5000
Start the server:

bash
npm run dev
3. Frontend Setup
bash
cd client
npm install
npm run dev
The application will be live at: http://localhost:5173

📖 Usage Guide
Authentication
Register an admin account and log in to access the protected dashboard.

Dashboard Overview
View high-level metrics of all active leads at a glance.

Lead Lifecycle
Action	Description
Add	Manually input new leads via the "New Lead" modal
Status Update	Use intuitive dropdowns to move leads through the pipeline
Detailed View	Click the eye icon to open the side panel for notes and history
Delete	Remove leads from the system when no longer needed

## 🤝 Contributing

Feel free to fork this project and submit a pull request!

## 📄 License
This project is open source and available under the MIT License."# FUTURE_FS_02" 
