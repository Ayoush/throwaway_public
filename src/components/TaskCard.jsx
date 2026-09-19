export default function TaskCard({ task }) {
  return (
    <article>
      <strong>{task.title}</strong>
      <div>{task.status}</div>
    </article>
  )
}
