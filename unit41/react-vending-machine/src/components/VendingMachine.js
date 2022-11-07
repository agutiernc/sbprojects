import React from "react";
import { Link } from 'react-router-dom'
import './VendingMachine.css'

const VendingMachine = () => {

  return (
    <div className="VendingMachine">
      <h2>Hello, I'm a vending machine. What would you like to have?</h2>

      <div className="container">
        <div className="img-container">
          <img src="./vm.png" alt='vending machine' />
        </div>

        <div className="list-container">
          <ul>
            <li>
              <Link to='/soda'>Soda</Link>
            </li>
            <li>
              <Link to='/liquorice'>Liquorice</Link>
            </li>
            <li>
              <Link to='/chips'>Chips</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VendingMachine;