import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SignupForm = () => {

  return (
    <div className='d-flex mt-5 flex-column align-items-center col-3 mx-auto justify-content-center w-25'>
      <div className='my-5'>
        <h1>Sign Up</h1>
      </div>

      <Form className='border border-3 p-4 rounded-2'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Control type="text" placeholder="Enter First Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Control type="text" placeholder="Enter Last Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email
          </Form.Text>
        </Form.Group>

        <Button variant="outline-secondary" type="submit" size="lg">
          Submit
        </Button>
      </Form>

      <div className='mt-3 text-muted text-center'>
        Already have an account?
        
        <div>
          <NavLink to="/login" className="text-decoration-none text-info">
            Login Here
          </NavLink>
        </div>
        
      </div>
    </div>
  )
}

export default SignupForm;