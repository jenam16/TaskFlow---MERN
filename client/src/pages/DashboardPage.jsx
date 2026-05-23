// client/src/pages/DashboardPage.jsx
// Overview dashboard: task stats, recent tasks, quick actions

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTask } from '../context/TaskContext'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns'

// ── Stat Card Component ───────────────────────
const StatCard = ({ label, value, color, icon }) => (
  <div className="card p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
)

// ── Priority Badge ────────────────────────────
const PriorityBadge = ({ priority }) => {
  const map = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high',
  }
  return <span className={map[priority] || 'badge-low'}>{priority}</span>
}

export default function DashboardPage() {
  const { tasks, fetchTasks, loading } = useTask()
  const { user } = useAuth()

  // Load tasks when page mounts
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Calculate stats
  const todo = tasks.filter((t) => t.status === 'todo').length
  const inProgress = tasks.filter((t) => t.status === 'inprogress').length
  const done = tasks.filter((t) => t.status === 'done').length
  const total = tasks.length

  // Recent 5 tasks
  const recent = tasks.slice(0, 5)

  // Overdue tasks (dueDate in the past and not done)
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
  ).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Here's what's happening with your tasks.</p>
        </div>
        <Link to="/tasks" className="btn-primary text-sm">
          + New Task
        </Link>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-5 h-24 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Tasks" value={total} icon="📋" color="bg-blue-50" />
          <StatCard label="To Do" value={todo} icon="🔘" color="bg-slate-50" />
          <StatCard label="In Progress" value={inProgress} icon="🔄" color="bg-amber-50" />
          <StatCard label="Completed" value={done} icon="✅" color="bg-green-50" />
        </div>
      )}

      {/* Overdue alert */}
      {overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-red-500">⚠️</span>
          <p className="text-sm text-red-700 font-medium">
            You have <strong>{overdue}</strong> overdue task{overdue > 1 ? 's' : ''}. Take action!
          </p>
          <Link to="/tasks" className="ml-auto text-sm text-red-600 font-semibold hover:underline">
            View
          </Link>
        </div>
      )}

      {/* Recent Tasks */}
      <div className="card">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="font-semibold text-slate-800">Recent Tasks</h2>
          <Link to="/tasks" className="text-sm text-blue-600 hover:underline font-medium">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          /* Empty state */
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-slate-500 font-medium">No tasks yet</p>
            <p className="text-slate-400 text-sm mt-1">Create your first task to get started!</p>
            <Link to="/tasks" className="btn-primary mt-4 inline-block text-sm">
              Create Task
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recent.map((task) => (
              <div key={task._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                {/* Status indicator dot */}
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  task.status === 'done' ? 'bg-green-500' :
                  task.status === 'inprogress' ? 'bg-blue-500' : 'bg-slate-400'
                }`} />
                {/* Task info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/tasks"
          className="card p-5 flex items-center gap-4 hover:shadow-card-hover transition-shadow group"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <span className="text-xl group-hover:grayscale">📝</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Manage Tasks</p>
            <p className="text-sm text-slate-400">Create, edit and filter your tasks</p>
          </div>
        </Link>
        <Link
          to="/kanban"
          className="card p-5 flex items-center gap-4 hover:shadow-card-hover transition-shadow group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
            <span className="text-xl group-hover:grayscale">🗂️</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Kanban Board</p>
            <p className="text-sm text-slate-400">Visualize progress with drag & drop</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
