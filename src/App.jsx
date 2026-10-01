import { useState } from 'react'

function App() {
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')

  const callCatalyst = async () => {
    try {
      setError('')

      const response = await fetch(
        '/api/server/catalyst_practical_learning_function/execute'
      )

      const data = await response.json()

      const result = JSON.parse(data.output)

      const item = result.get[0].item

      setTask({
        taskId: item.taskId.S,
        status: item.status.S,
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>{import.meta.env.VITE_APP_NAME} Developer App</h1>

      <button onClick={callCatalyst}>
        Load Task
      </button>

      {task && (
        <div>
          <h2>Task Details</h2>
          <p>Task ID: {task.taskId}</p>
          <p>Status: {task.status}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  )
}

export default App