Todo App
# Full Stack TODO App

This is a full-stack TODO application built with the MERN stack: **MongoDB**, **Express**, **React**, and **Node.js**. It includes user authentication, task CRUD operations, filtering, searching, and pagination.

---

## Features

- 🔐 User Registration, Login, and Logout using JWT
- ✅ Create, Read, Update, Delete tasks
- 🔍 Search tasks by name
- 📅 Filter tasks by date and status (PENDING/DONE)
- 📄 Paginate tasks (10 per page)
- 🌐 Fully responsive UI
- ⚙️ State management with Redux Toolkit
- 🎨 Styled with TailwindCSS

---

## Folder Structure


---

## 🔧 Backend Setup (Node.js + Express + MongoDB)

### Prerequisites

- Node.js >= 14.x
- MongoDB installed locally or MongoDB Atlas

### Setup Instructions

1. Navigate to the backend folder:

```bash
cd server


Create a .env file in the server directory and add:
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=

Create a .env file in the client directory and add:
VITE_API_BASE_URL=


Technologies Used
Frontend: ReactJS, Vite, Redux Toolkit, TailwindCSS
Backend: Node.js, Express, MongoDB, Mongoose

Authentication: JWT