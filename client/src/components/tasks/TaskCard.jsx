// client/src/components/tasks/TaskCard.jsx
// Reusable task card — used in both TasksPage and KanbanPage

import { format } from 'date-fns'
import { useTask } from '../../context/TaskContext'

const priorityClasses = {
  low: 'badge-low',
  medium: 'badge-medium',
  high: 'badge-high',
}

const statusClasses = {
  todo: 'badge-todo',
  inprogress: 'badge-inprogress',
  done: 'badge-done',
}

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
}

export default function TaskCard({ task, onEdit, showStatus = true }) {
  const { deleteTask } = useTask()

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'done'

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(task._id)
    }
  }

  return (
    <div className="card p-4 hover:shadow-card-hover transition-shadow group">
      {/* Top row: priority + actions */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={priorityClasses[task.priority]}>{task.priority}</span>
        {/* Action buttons — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-sm font-semibold mb-1 ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{task.description}</p>
      )}

      {/* Bottom row: status + due date */}
      <div className="flex items-center justify-between gap-2 mt-3">
        {showStatus && (
          <span className={statusClasses[task.status]}>{statusLabels[task.status]}</span>
        )}
        {task.dueDate && (
          <span className={`text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-slate-400'}`}>
            {isOverdue ? '⚠️ ' : '📅 '}
            {format(new Date(task.dueDate), 'MMM d')}
          </span>
        )}
      </div>
    </div>
  )
}
