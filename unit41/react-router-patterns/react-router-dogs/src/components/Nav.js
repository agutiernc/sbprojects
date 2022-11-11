import React from "react";
import { NavLink } from 'react-router-dom'

const Nav = ({ dogs }) => {

  return (
    <nav className="my-3 text-center">
      <NavLink to='/dogs' className='p-2'>
        Home
      </NavLink>

     {
        dogs.map(d =>
          <NavLink
            key={d.name}
            to={{ pathname: `dogs/${d.src}` }}
            className='px-2'
          >
            {d.name}
          </NavLink>
        )
      }
    </nav>
  )
}

export default Nav;