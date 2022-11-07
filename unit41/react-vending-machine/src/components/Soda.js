import React from "react";
import { Link } from 'react-router-dom'
import './Soda.css'

const Soda = () => {

  return (
    <div className="Soda">
      <h1>Have this refreshing Root Beer Soda!</h1>

      <div className="container">
        <div className="img-container">
          <img src="/soda.png" alt="soda" />
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

export default Soda;