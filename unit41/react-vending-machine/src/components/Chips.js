import React from 'react'
import { Link } from 'react-router-dom'
import './Chips.css'

const Chips = () => {

  return (
    <div className="Chips">
      <h1>These chips are sooo tasty! BBQ!! mmmmm!</h1>

      <div className="container">
        <div className="img-container">
          <img src="/chips.jpg" alt="chips" />
        </div>
        <div className="btn-container">
          <Link to='/'>
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Chips;