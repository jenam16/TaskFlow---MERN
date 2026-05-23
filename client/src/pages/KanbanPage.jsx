// client/src/pages/KanbanPage.jsx
// Kanban board with drag-and-drop using @hello-pangea/dnd

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useTask } from '../context/TaskContext'
import TaskCard from '../components/tasks/TaskCard'
import TaskModal from '../components/tasks/TaskModal'

// ── Column config ─────────────────────────────
const COLUMNS = [
  {
    id: 'todo',
    label: 'To Do',
    color: 'bg-slate-400',
    bgLight: 'bg-slate-50',
    count_color: 'bg-slate-200 text-slate-600',
  },
  {
    id: 'inprogress',
    label: 'In Progress',
    color: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    count_color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'done',
    label: 'Done',
    color: 'bg-green-500',
    bgLight: 'bg-green-50',
    count_color: 'bg-green-100 text-green-700',
  },
]

export default function KanbanPage() {
  const { tasks, fetchTasks, loading, updateTaskStatus } = useTask()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleEdit = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  const handleCreate = () => {
    setEditTask(null)
    setModalOpen(true)
  }

  // ── Drag end handler ──────────────────────────
  // Called when user drops a card in a column
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    // Dropped outside a column or same position
    if (!destination) return
    if (destination.droppableId === source.droppableId) return

    // Update task status to the new column's id
    await updateTaskStatus(draggableId, destination.droppableId)
  }

  // Group tasks by status
  const getColumnTasks = (status) => tasks.filter((t) => t.status === status)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kanban Board</h1>
          <p className="text-slate-400 text-sm mt-0.5">Drag tasks between columns to update status</p>
        </div>
        <button onClick={handleCreate} className="btn-primary text-sm">
          + New Task
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-4 h-64 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : (
        /* Drag and Drop context wraps all columns */
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((col) => {
              const colTasks = getColumnTasks(col.id)
              return (
                <div key={col.id} className="flex flex-col">
                  {/* Column Header */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                    <h2 className="font-semibold text-slate-700 text-sm">{col.label}</h2>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${col.count_color}`}>
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Droppable column area */}
                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[200px] rounded-xl p-3 transition-colors space-y-3 ${
                          snapshot.isDraggingOver ? col.bgLight + ' ring-2 ring-offset-1 ring-blue-300' : 'bg-slate-100'
                        }`}
                      >
                        {colTasks.length === 0 && !snapshot.isDraggingOver && (
                          <div className="flex flex-col items-center justify-center h-28 text-slate-400 text-xs text-center">
                            <p className="text-2xl mb-1">
                              {col.id === 'todo' ? '📋' : col.id === 'inprogress' ? '🔄' : '✅'}
                            </p>
                            Drop tasks here
                          </div>
                        )}

                        {/* Draggable task cards */}
                        {colTasks.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.85 : 1,
                                }}
                              >
                                {/* showStatus=false because column already shows status */}
                                <TaskCard
                                  task={task}
                                  onEdit={handleEdit}
                                  showStatus={false}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      )}

      {/* Create/Edit Modal */}
      <TaskModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditTask(null) }} editTask={editTask} />
    </div>
  )
}
