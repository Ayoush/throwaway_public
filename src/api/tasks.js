const STORAGE_KEY = 'throwaway-kanban-tasks'

const SEED_TASKS = [
  { id: '1', title: 'Write project README', status: 'done' },
  { id: '2', title: 'Scaffold Vite + React app', status: 'done' },
  { id: '3', title: 'Load tasks from local API', status: 'in_progress' },
  { id: '4', title: 'Render a kanban board with columns', status: 'todo' },
  { id: '5', title: 'Drag cards between columns', status: 'todo' },
  { id: '6', title: 'Review board layout before ship', status: 'review' },
]

function readStore() {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TASKS))
    return SEED_TASKS.map((task) => ({ ...task }))
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : SEED_TASKS.map((task) => ({ ...task }))
  } catch {
    return SEED_TASKS.map((task) => ({ ...task }))
  }
}

function writeStore(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export async function listTasks() {
  return readStore()
}

export async function updateTask(id, patch) {
  const tasks = readStore()
  const next = tasks.map((task) =>
    task.id === id ? { ...task, ...patch, id: task.id } : task,
  )
  writeStore(next)
  return next.find((task) => task.id === id) ?? null
}
