import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewTodoForm = ({ newTodo }) => {
  const initialState = { todo: '' }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    newTodo({ ...formData, id: uuidv4() })
    
    setFormData(initialState)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Add todo:</label>
        <input
          id="todo"
          type="text"
          name="todo"
          value={formData.todo}
          onChange={handleChange}
        />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default NewTodoForm;