import React from 'react';
import { Link } from 'react-router-dom';

const ColorsList = ({ colors }) => {

  return (
    <div>
      <div className='text-center mt-1 py-5 bg-dark text-white'>
        <h1 className='my-5'>Welcome To The Color Factory</h1>

        <h2><Link to='/colors/new' className='link-light'>Add a Color</Link></h2>
      </div>
      
      <div className='text-center mt-5'>
        <h3>Please select a color:</h3>

        <ul className='list-unstyled'>
          {
            colors.map(c => (
              <li key={c}>
                <Link to={c} className='link-dark'>
                  {c}
                </Link>
              </li>
            )).reverse()
          }
        </ul>
      </div>
    </div>
  )
}

export default ColorsList;