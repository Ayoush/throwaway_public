import { useEffect, useState } from 'react'
import TaskCard from './TaskCard.jsx'

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' },
]

const boardStyle = { display: "flex", gap: "1rem", alignItems: "flex-start" }
const columnStyle = { flex: 1, minHeight: "16rem", padding: "0.75rem", background: "#f4f4f5", borderRadius: 8 }
const cardWrapStyle = { marginBottom: "0.5rem", cursor: "grab" }

export default function Board({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  function handleDragStart(event, taskId) {
    event.dataTransfer.setData('text/plain', taskId)
    event.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(event, status) {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/plain')
    if (!id) return

    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    )
    // TODO: persist via updateTask()
  }

  return (
    <div style={boardStyle}>
      {COLUMNS.map((column) => (
        <section
          key={column.id}
          style={columnStyle}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, column.id)}
        >
          <h2>{column.title}</h2>
          {tasks
            .filter((task) => task.status === column.id)
            .map((task) => (
              <div
                key={task.id}
                draggable
                style={cardWrapStyle}
                onDragStart={(event) => handleDragStart(event, task.id)}
              >
                <TaskCard task={task} />
              </div>
            ))}
        </section>
      ))}
    </div>
  )
}
