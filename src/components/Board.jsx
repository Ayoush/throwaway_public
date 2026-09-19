import TaskCard from './TaskCard.jsx'

export default function Board({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}
