import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

const Color = ({ colors }) => {
  const { name } = useParams()
  const navigate = useNavigate()

  // redirect to main page if color name isn't valid
  useEffect(() => {
    if (!colors.includes(name)) {
      navigate('/')
    }
  })
  

  const color = colors.filter(c => c === name)

  const divStyles = {
    backgroundColor: color,
    color: 'white',
    height: '100vh',
    minHeight : '100vh'
  }

  return (
    <div style={divStyles} className='text-center'>
      <div>
        <h1 className="my-5">This is {color}</h1>

        <h2>Isn't it beautiful?</h2>
      </div>

      <div>
        <Link to='/'>
          <Button variant="primary">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Color;