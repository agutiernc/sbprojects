import React from 'react'

const Todo = ({ id, todo, handleRemove }) => {
  
  return (
    <li>
      {todo} - <button onClick={() => handleRemove(id)}>x</button>
    </li>
  )
}

export default Todo