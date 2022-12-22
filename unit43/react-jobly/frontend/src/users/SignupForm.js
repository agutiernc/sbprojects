import React, { useState, useContext } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import UserContext from './UserContext'

import Notify from '../common/Notify'

const SignupForm = ({ signup }) => {
  const navigate = useNavigate()
  const { currentUser, message, setMessage } = useContext(UserContext)
  const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  const [formData, setFormData] = useState(initialState)

  if (currentUser) {
    return <Navigate to='/' />
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signup(formData)

      if (res.success) {
        navigate('/')
      } else {
        setMessage({ msg: 'Unable to create account. Please, try again.', type: 'error' })
        
        return;
      }
    } catch (errors) {
      console.log('error: ', errors)
    }
  }
  
  return (
    <div className='d-flex mt-5 flex-column align-items-center col-3 mx-auto justify-content-center w-50'>
      <Notify message={message} />

      <div className='my-5'>
        <h1>Sign Up</h1>
      </div>

      <Form onSubmit={handleSubmit} className='border border-3 p-4 rounded-2'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Control 
            type="text" 
            placeholder="Enter First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Control 
            type="text" 
            placeholder="Enter Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control 
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
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