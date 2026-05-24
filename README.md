# TaskFlow 🗂️

<div align="center">

![TaskFlow](https://img.shields.io/badge/TaskFlow-Task%20Management-2563eb?style=for-the-badge&logo=task&logoColor=white)
![MERN](https://img.shields.io/badge/Stack-MERN-00d084?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live%20%26%20Deployed-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A modern, full-stack Jira-inspired task management dashboard built with the MERN stack.**

[🚀 Live Demo](https://tasks-flow2.vercel.app) &nbsp;|&nbsp; [📖 API Docs](#-api-endpoints) &nbsp;|&nbsp; [🛠️ Run Locally](#-run-locally)

![TaskFlow Banner](https://placehold.co/900x400/1e40af/ffffff?text=TaskFlow+%E2%80%94+Jira-Inspired+Task+Management)

</div>

---

## 📖 Overview

TaskFlow is a **production-deployed** full-stack task management application that lets users organize work visually using a Kanban board. It features JWT-based authentication, real-time UI updates, drag-and-drop task management, and a responsive dashboard with live stats.

> 🔗 **Live at:** https://tasks-flow2.vercel.app

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Register, Login, JWT-secured routes, auto logout on token expiry |
| 📋 **Task Management** | Create, edit, delete, search and filter tasks by status/priority |
| 🗂️ **Kanban Board** | Drag and drop tasks across To Do → In Progress → Done |
| 📊 **Dashboard** | Task stats, recent activity, overdue alerts |
| 🔍 **Search & Filter** | Filter by status, priority, or keyword in real time |
| 🎨 **Modern UI** | Responsive Tailwind CSS design with toast notifications |
| 🔒 **Protected Routes** | Each user only sees and manages their own tasks |
| ☁️ **Cloud Deployed** | Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6 |
| State Management | React Context API (AuthContext + TaskContext) |
| HTTP Client | Axios with request/response interceptors |
| Drag & Drop | @hello-pangea/dnd |
| Backend | Node.js, Express.js (MVC architecture) |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens) + bcryptjs |
| Notifications | react-hot-toast |

---

## 🏗️ Architecture

```
USER BROWSER (React + Vite)
        │
        │  HTTP Requests via Axios (auto-attaches JWT)
        ▼
VERCEL ── React Frontend
           └─ Pages: Login, Register, Dashboard, Tasks, Kanban
           └─ Context: AuthContext, TaskContext
           └─ Services: api.js (Axios + interceptors)
        │
        │  REST API → https://taskflow-backend-yxr1.onrender.com/api
        ▼
RENDER ── Node.js + Express Server
           └─ Routes: /api/auth, /api/tasks
           └─ Middleware: CORS, JSON parser, JWT protect
           └─ Controllers: authController, taskController
        │
        │  Mongoose queries
        ▼
MongoDB Atlas ── Cloud Database
           └─ Collections: users, tasks
```

---

## 📁 Folder Structure

```
taskflow/
├── server/                     # Express + Node.js Backend
│   ├── config/db.js            # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js   # Register, Login, GetMe logic
│   │   └── taskController.js   # CRUD operations for tasks
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT token verification
│   ├── models/
│   │   ├── User.js             # User schema (name, email, hashed password)
│   │   └── Task.js             # Task schema (title, status, priority, dueDate)
│   ├── routes/
│   │   ├── authRoutes.js       # /register, /login, /me
│   │   └── taskRoutes.js       # GET, POST, PUT, DELETE /tasks
│   ├── utils/generateToken.js  # JWT generator (7-day expiry)
│   ├── index.js                # Entry point — CORS, middleware, routes
│   └── .env.example
│
├── client/src/                 # React + Vite Frontend
│   ├── components/tasks/
│   │   ├── TaskCard.jsx        # Reusable card with edit/delete
│   │   └── TaskModal.jsx       # Create/Edit modal form
│   ├── context/
│   │   ├── AuthContext.jsx     # Global auth state
│   │   └── TaskContext.jsx     # Global task state + CRUD
│   ├── layouts/
│   │   └── DashboardLayout.jsx # Sidebar + topbar
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx   # Stats + recent tasks
│   │   ├── TasksPage.jsx       # List view with search/filter
│   │   └── KanbanPage.jsx      # Drag-and-drop board
│   ├── services/api.js         # Axios instance with JWT interceptors
│   └── App.jsx                 # Router + protected/public routes
│
├── package.json                # Root scripts (run both servers)
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend — `server/.env`

```bash
cp server/.env.example server/.env
```

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ `VITE_API_URL` is baked into the build at compile time. After changing it in Vercel, always trigger a full redeploy.

---

## 🚀 Run Locally

**Prerequisites:** Node.js v18+, npm, MongoDB local or Atlas URI

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow

# 2. Install all dependencies (root + server + client)
npm run install-all

# 3. Set up environment variables
cp server/.env.example server/.env
# Edit server/.env — add your MONGO_URI and JWT_SECRET

# 4. Run both frontend and backend together
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |

---

## 🌐 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login + receive JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### Tasks — `/api/tasks`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `GET` | `/api/tasks` | Get all tasks for logged-in user | ✅ |
| `POST` | `/api/tasks` | Create a new task | ✅ |
| `PUT` | `/api/tasks/:id` | Update task | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete a task | ✅ |

**Example:**
```bash
curl -X POST https://taskflow-backend-yxr1.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

---

## ☁️ Deployment

### Backend (Render)
1. New Web Service → connect GitHub repo
2. Root Directory: `server` | Build: `npm install` | Start: `node index.js`
3. Add env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `NODE_ENV=production`

### Frontend (Vercel)
1. Import repo → Root Directory: `client`
2. Build: `npm run build` | Output: `dist`
3. Add env var: `VITE_API_URL=https://your-render-url.onrender.com/api`
4. **Redeploy after every env var change**

### MongoDB Atlas
1. Free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Network Access → Add IP `0.0.0.0/0` (required for Render)
3. Create DB user → copy connection string to `MONGO_URI`

---

## 🔐 Security

- Passwords hashed with **bcryptjs** (salt rounds: 10) — never stored plain
- JWT tokens expire after **7 days**
- Task ownership verified on every update/delete — users can't modify others' tasks
- `.env` files excluded from Git via `.gitignore`

---

## 🗺️ Roadmap

- [ ] Refresh tokens for enhanced security
- [ ] Team/project collaboration features
- [ ] Email notifications for due dates
- [ ] Pagination for large task lists
- [ ] Dark mode
- [ ] MongoDB indexes for production scale

---

## 👨‍💻 Author

**JENAM JAIN**
- GitHub: [@jenam16](https://github.com/jenam16)
- LinkedIn: [linkedin.com/in/jenam-jain](https://linkedin.com/in/jenam-jain)
- Live: [tasks-flow2.vercel.app](https://tasks-flow2.vercel.app)

---

## 📄 License

[MIT](LICENSE)

---

<div align="center">
  <sub>⭐ Star this repo if you found it useful!</sub>
</div>
