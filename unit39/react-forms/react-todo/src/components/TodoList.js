import React, { useState } from 'react'
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'

const TodoList = () => {
  const [todos, setTodos] = useState([])

  const newTodo = (todoObj) => setTodos(todos => [...todos, todoObj])
  const deleteTodo = (id) => setTodos(todos => todos.filter(t => t.id !== id))

  return (
    <div>
      <h1>Todos</h1>

      <div>
        <NewTodoForm newTodo={newTodo} />
      </div>

      <div>
        <ul>
          {
            todos.map(t => (
              <Todo
                key={t.id}
                id={t.id}
                todo={t.todo}
                handleRemove={deleteTodo}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default TodoList