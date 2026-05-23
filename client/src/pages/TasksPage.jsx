// client/src/pages/TasksPage.jsx
// Full task list with search, filter, create, edit, delete

import { useEffect, useState } from 'react'
import { useTask } from '../context/TaskContext'
import TaskCard from '../components/tasks/TaskCard'
import TaskModal from '../components/tasks/TaskModal'

export default function TasksPage() {
  const { tasks, fetchTasks, loading } = useTask()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null) // null = create mode

  // Search & filter state
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // ── Open modal for editing ────────────────────
  const handleEdit = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  // ── Open modal for creating ───────────────────
  const handleCreate = () => {
    setEditTask(null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditTask(null)
  }

  // ── Apply search + filters ────────────────────
  const filtered = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || task.status === filterStatus
    const matchPriority = filterPriority === 'all' || task.priority === filterPriority
    return matchSearch && matchStatus && matchPriority
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button onClick={handleCreate} className="btn-primary text-sm">
          + New Task
        </button>
      </div>

      {/* Search & Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="input-field pl-9"
          />
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field sm:w-36"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Priority filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="input-field sm:w-36"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Clear filters */}
        {(search || filterStatus !== 'all' || filterPriority !== 'all') && (
          <button
            onClick={() => { setSearch(''); setFilterStatus('all'); setFilterPriority('all') }}
            className="btn-secondary text-sm whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 h-32 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div className="card text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-600 font-semibold">No tasks found</p>
          <p className="text-slate-400 text-sm mt-1">
            {tasks.length === 0
              ? 'Create your first task to get started!'
              : 'Try adjusting your search or filters.'}
          </p>
          {tasks.length === 0 && (
            <button onClick={handleCreate} className="btn-primary mt-4 text-sm">
              Create Task
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <TaskModal isOpen={modalOpen} onClose={handleCloseModal} editTask={editTask} />
    </div>
  )
}
