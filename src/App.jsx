import { useEffect, useState } from 'react'
import { listTasks } from './api/tasks.js'
import Board from './components/Board.jsx'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    listTasks()
      .then((next) => {
        if (!cancelled) setTasks(next)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main>
      <h1>Throwaway Kanban</h1>
      {error ? <p>{error}</p> : <Board tasks={tasks} />}
    </main>
  )
}
