import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {

  return (
    <div className='d-flex mt-5 flex-column align-items-center col-3 mx-auto justify-content-center w-25'>
      <div className='my-5'>
        <h1>Login</h1>
      </div>

      <Form className='border border-3 p-4 rounded-2'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>

        <Button variant="outline-secondary" type="submit" size="lg">
          Submit
        </Button>
      </Form>

      <div className='mt-3 text-muted text-center'>
        Don't have an account?
        
        <div>
          <NavLink to="/signup" className="text-decoration-none text-info">
            Signup Here
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;