import React, { useState } from 'react';
import '../EightBall.css'

const randomChoices = (items) => items[Math.floor(Math.random() * items.length)];

const EightBall = ({ answers }) => {
  const [color, setColor] = useState('black')
  const [msg, setMsg] = useState('Think of a Question')

  const handleClick = () => {
    const { msg, color } = randomChoices(answers)

    setColor(color)
    setMsg(msg)
  }

  return (
    <div 
      className='EightBall' 
      onClick={ handleClick }
      style={{ backgroundColor: color }}
    >
      <p>{ msg }</p>
    </div>
  )
}

export default EightBall;