import React from "react";
import { Link } from 'react-router-dom'
import './Liquorice.css'

const Liquorice = () => {

  return (
    <div className="Liquorice">
      <h1>Red Vines are the best Liquorice!</h1>

      <div className="container">
        <div className="img-container">
          <img src="/redvines.png" alt="liqourice" />
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

export default Liquorice;