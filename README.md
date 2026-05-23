# TaskFlow 🗂️ > A modern, full-stack Jira-inspired task management dashboard built with the MERN stack. ![TaskFlow Banner](https://placehold.co/900x300/2563eb/ffffff?text=TaskFlow+—+Team+Task+Management) --- ## 📖 Overview TaskFlow is a clean and responsive task management application that allows users to organize their work using an intuitive Kanban board and task list. Built from scratch using the MERN stack with JWT-based authentication. --- ## ✨ Features - 🔐 **Authentication** — Register, Login, JWT-secured routes, Logout - 📋 **Task Management** — Create, edit, delete, search and filter tasks - 🗂️ **Kanban Board** — Drag and drop tasks across To Do / In Progress / Done columns - 📊 **Dashboard** — Stats overview, recent tasks, overdue alerts - 🎨 **Modern UI** — Responsive design with Tailwind CSS, toast notifications - 🔒 **Protected Routes** — Each user only sees their own tasks --- ## 🛠️ Tech Stack | Layer | Technology | |-------|-----------| | Frontend | React 18, Vite, Tailwind CSS, React Router v6 | | State | React Context API | | HTTP Client | Axios | | Drag & Drop | @hello-pangea/dnd | | Backend | Node.js, Express.js | | Database | MongoDB, Mongoose | | Auth | JWT, bcryptjs | | Notifications | react-hot-toast | --- ## 📁 Folder Structure
taskflow/
├── server/                  # Backend
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── index.js             # Server entry point
│   ├── .env.example
│   └── package.json
│
├── client/                  # Frontend
│   └── src/
│       ├── components/
│       │   └── tasks/
│       │       ├── TaskCard.jsx
│       │       └── TaskModal.jsx
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── TaskContext.jsx
│       ├── layouts/
│       │   └── DashboardLayout.jsx
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── TasksPage.jsx
│       │   └── KanbanPage.jsx
│       ├── services/
│       │   └── api.js       # Axios instance
│       ├── App.jsx
│       └── main.jsx
│
├── package.json             # Root scripts
├── .gitignore
└── README.md
--- ## ⚙️ Environment Variables Create a .env file in the server/ directory (use .env.example as reference):
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:5173
--- ## 🚀 Run Locally ### Prerequisites - Node.js v18+ - MongoDB running locally (or a MongoDB Atlas URI) - npm ### Steps
bash
# 1. Clone the repository
git clone https://github.com/jenam16/TaskFlow---MERN.git
cd taskflow

# 2. Install all dependencies (root + server + client)
npm run install-all

# 3. Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# 4. Run both frontend and backend together
npm run dev
- Frontend: http://localhost:5173 - Backend API: http://localhost:5000 --- ## 🌐 API Endpoints | Method | Endpoint | Description | Auth | |--------|----------|-------------|------| | POST | /api/auth/register | Register new user | ❌ | | POST | /api/auth/login | Login user | ❌ | | GET | /api/auth/me | Get current user | ✅ | | GET | /api/tasks | Get all user tasks | ✅ | | POST | /api/tasks | Create a task | ✅ | | PUT | /api/tasks/:id | Update a task | ✅ | | DELETE | /api/tasks/:id | Delete a task | ✅ | --- ## 📦 Deployment ### Backend (Render / Railway) 1. Create a new Web Service 2. Set root directory to server/ 3. Build command: npm install 4. Start command: node index.js 5. Add environment variables from .env ### Frontend (Vercel / Netlify) 1. Set root directory to client/ 2. Build command: npm run build 3. Output directory: dist/ 4. Add env variable: VITE_API_URL=https://your-backend-url.com > **Note:** For production, update the Vite proxy config or use VITE_API_URL in your Axios base URL. --- ## 👨‍💻 Author Built for the **Isaii AI — MERN Stack Developer Intern Assessment** --- ## 📄 License MIT
